from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import get_db
from app.models import Post, Comment, User, post_likes
from app.schemas import PostCreate, PostResponse, CommentCreate, CommentResponse
from app.routers.auth import get_current_user

router = APIRouter()


@router.get("/")
async def get_posts(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """Paylaşımları listele."""
    offset = (page - 1) * page_size

    # Count total
    count_result = await db.execute(select(func.count(Post.id)).where(Post.is_active == True))
    total = count_result.scalar()

    # Get posts
    result = await db.execute(
        select(Post)
        .where(Post.is_active == True)
        .order_by(Post.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    posts = result.scalars().all()

    return {
        "items": posts,
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.post("/", status_code=201)
async def create_post(
    post_data: PostCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Yeni paylaşım oluştur."""
    post = Post(
        id=uuid4(),
        author_id=current_user.id,
        content=post_data.content,
    )
    db.add(post)
    await db.flush()
    return {"id": str(post.id), "message": "Paylaşım oluşturuldu"}


@router.post("/{post_id}/like")
async def like_post(
    post_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Paylaşımı beğen / beğeniyi kaldır."""
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=404, detail="Paylaşım bulunamadı")

    # Toggle like
    like_result = await db.execute(
        select(post_likes).where(
            post_likes.c.user_id == current_user.id,
            post_likes.c.post_id == post_id,
        )
    )
    existing = like_result.first()

    if existing:
        await db.execute(
            post_likes.delete().where(
                post_likes.c.user_id == current_user.id,
                post_likes.c.post_id == post_id,
            )
        )
        return {"liked": False}
    else:
        await db.execute(
            post_likes.insert().values(user_id=current_user.id, post_id=post_id)
        )
        return {"liked": True}


@router.post("/{post_id}/comments", status_code=201)
async def create_comment(
    post_id: str,
    comment_data: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Paylaşıma yorum yap."""
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=404, detail="Paylaşım bulunamadı")

    comment = Comment(
        id=uuid4(),
        post_id=post_id,
        author_id=current_user.id,
        content=comment_data.content,
    )
    db.add(comment)
    await db.flush()
    return {"id": str(comment.id), "message": "Yorum eklendi"}


@router.get("/{post_id}/comments")
async def get_comments(
    post_id: str,
    page: int = Query(1, ge=1),
    db: AsyncSession = Depends(get_db),
):
    """Paylaşımın yorumlarını listele."""
    offset = (page - 1) * 20
    result = await db.execute(
        select(Comment)
        .where(Comment.post_id == post_id)
        .order_by(Comment.created_at.asc())
        .offset(offset)
        .limit(20)
    )
    return result.scalars().all()

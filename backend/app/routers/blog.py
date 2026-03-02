from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import get_db
from app.models import BlogPost

router = APIRouter()


@router.get("/")
async def get_blog_posts(
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
    category: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """Blog yazılarını listele."""
    offset = (page - 1) * page_size
    query = select(BlogPost).where(BlogPost.is_published == True)

    if category:
        query = query.where(BlogPost.category == category)

    count_result = await db.execute(
        select(func.count(BlogPost.id)).where(BlogPost.is_published == True)
    )
    total = count_result.scalar()

    result = await db.execute(
        query.order_by(BlogPost.created_at.desc()).offset(offset).limit(page_size)
    )
    posts = result.scalars().all()

    return {
        "items": posts,
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/{slug}")
async def get_blog_post(slug: str, db: AsyncSession = Depends(get_db)):
    """Blog yazısı detayını getir."""
    result = await db.execute(
        select(BlogPost).where(BlogPost.slug == slug, BlogPost.is_published == True)
    )
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=404, detail="Yazı bulunamadı")

    # Increment views
    post.views += 1
    await db.flush()

    return post

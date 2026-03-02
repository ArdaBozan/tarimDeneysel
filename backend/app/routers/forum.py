from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import get_db
from app.models import ForumCategory, ForumTopic, ForumReply, User
from app.schemas import TopicCreate, ReplyCreate
from app.routers.auth import get_current_user

router = APIRouter()


@router.get("/categories")
async def get_categories(db: AsyncSession = Depends(get_db)):
    """Forum kategorilerini listele."""
    result = await db.execute(
        select(ForumCategory).order_by(ForumCategory.order)
    )
    categories = result.scalars().all()
    return categories


@router.get("/topics")
async def get_topics(
    category_id: str = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """Konuları listele."""
    offset = (page - 1) * page_size
    query = select(ForumTopic).where(ForumTopic.is_active == True)

    if category_id:
        query = query.where(ForumTopic.category_id == category_id)

    # Pinned first, then by newest
    query = query.order_by(ForumTopic.is_pinned.desc(), ForumTopic.created_at.desc())

    count_result = await db.execute(
        select(func.count(ForumTopic.id)).where(ForumTopic.is_active == True)
    )
    total = count_result.scalar()

    result = await db.execute(query.offset(offset).limit(page_size))
    topics = result.scalars().all()

    return {
        "items": topics,
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.post("/topics", status_code=201)
async def create_topic(
    topic_data: TopicCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Yeni forum konusu oluştur."""
    # Verify category exists
    result = await db.execute(
        select(ForumCategory).where(ForumCategory.id == topic_data.category_id)
    )
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Kategori bulunamadı")

    topic = ForumTopic(
        id=uuid4(),
        title=topic_data.title,
        content=topic_data.content,
        author_id=current_user.id,
        category_id=topic_data.category_id,
    )
    db.add(topic)
    await db.flush()
    return {"id": str(topic.id), "message": "Konu oluşturuldu"}


@router.get("/topics/{topic_id}")
async def get_topic(topic_id: str, db: AsyncSession = Depends(get_db)):
    """Konu detayını getir."""
    result = await db.execute(
        select(ForumTopic).where(ForumTopic.id == topic_id)
    )
    topic = result.scalar_one_or_none()
    if not topic:
        raise HTTPException(status_code=404, detail="Konu bulunamadı")

    # Increment views
    topic.views += 1
    await db.flush()

    # Get replies
    replies_result = await db.execute(
        select(ForumReply)
        .where(ForumReply.topic_id == topic_id)
        .order_by(ForumReply.created_at.asc())
    )
    replies = replies_result.scalars().all()

    return {
        "topic": topic,
        "replies": replies,
    }


@router.post("/topics/{topic_id}/replies", status_code=201)
async def reply_to_topic(
    topic_id: str,
    reply_data: ReplyCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Konuya cevap yaz."""
    result = await db.execute(
        select(ForumTopic).where(ForumTopic.id == topic_id)
    )
    topic = result.scalar_one_or_none()
    if not topic:
        raise HTTPException(status_code=404, detail="Konu bulunamadı")

    reply = ForumReply(
        id=uuid4(),
        topic_id=topic_id,
        author_id=current_user.id,
        content=reply_data.content,
    )
    db.add(reply)
    await db.flush()
    return {"id": str(reply.id), "message": "Cevap eklendi"}

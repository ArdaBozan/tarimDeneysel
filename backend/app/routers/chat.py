from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models import ChatSession, ChatMessage, User
from app.schemas import ChatMessageRequest
from app.routers.auth import get_current_user
from app.services.chatbot import get_chatbot_response

router = APIRouter()


@router.post("/message")
async def send_message(
    msg_data: ChatMessageRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """AI chatbot'a mesaj gönder ve cevap al."""
    session = None

    # Get or create session
    if msg_data.session_id:
        result = await db.execute(
            select(ChatSession).where(
                ChatSession.id == msg_data.session_id,
                ChatSession.user_id == current_user.id,
            )
        )
        session = result.scalar_one_or_none()

    if not session:
        session = ChatSession(
            id=uuid4(),
            user_id=current_user.id,
            title=msg_data.message[:50],
        )
        db.add(session)
        await db.flush()

    # Save user message
    user_msg = ChatMessage(
        id=uuid4(),
        session_id=session.id,
        role="user",
        content=msg_data.message,
    )
    db.add(user_msg)

    # Get AI response
    # Retrieve conversation history for context
    history_result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == session.id)
        .order_by(ChatMessage.created_at.asc())
    )
    history = history_result.scalars().all()

    ai_response = await get_chatbot_response(
        message=msg_data.message,
        history=[(m.role, m.content) for m in history],
        user=current_user,
    )

    # Save AI response
    ai_msg = ChatMessage(
        id=uuid4(),
        session_id=session.id,
        role="assistant",
        content=ai_response,
    )
    db.add(ai_msg)
    await db.flush()

    return {
        "session_id": str(session.id),
        "user_message": {"id": str(user_msg.id), "content": msg_data.message},
        "assistant_message": {"id": str(ai_msg.id), "content": ai_response},
    }


@router.get("/sessions")
async def get_sessions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Kullanıcının sohbet geçmişini listele."""
    result = await db.execute(
        select(ChatSession)
        .where(ChatSession.user_id == current_user.id)
        .order_by(ChatSession.updated_at.desc())
    )
    sessions = result.scalars().all()
    return sessions


@router.get("/sessions/{session_id}")
async def get_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Sohbet detayını getir."""
    result = await db.execute(
        select(ChatSession).where(
            ChatSession.id == session_id,
            ChatSession.user_id == current_user.id,
        )
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Sohbet bulunamadı")

    messages_result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
    )
    messages = messages_result.scalars().all()

    return {
        "session": session,
        "messages": messages,
    }

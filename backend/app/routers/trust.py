from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas import TrustCheckRequest, TrustCheckResponse
from app.services.misinformation import check_content_trust

router = APIRouter()


@router.post("/check", response_model=TrustCheckResponse)
async def check_trust(
    data: TrustCheckRequest,
    db: AsyncSession = Depends(get_db),
):
    """İçeriğin güvenilirliğini kontrol et ve güven skoru ata."""
    result = await check_content_trust(data.content)
    return result

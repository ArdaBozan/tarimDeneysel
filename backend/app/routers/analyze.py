import os
import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import PlantAnalysis, User
from app.routers.auth import get_current_user
from app.config import settings
from app.services.image_analysis import analyze_plant_image

router = APIRouter()

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


@router.post("/image")
async def analyze_image(
    image: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Bitki fotoğrafını analiz et - hastalık, zararlı ve besin eksikliği tespiti."""
    # Validate file
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Lütfen bir görüntü dosyası yükleyin")

    ext = os.path.splitext(image.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Desteklenen formatlar: {', '.join(ALLOWED_EXTENSIONS)}",
        )

    content = await image.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="Dosya boyutu 10MB'ı aşamaz")

    # Save file
    file_id = str(uuid.uuid4())
    filename = f"{file_id}{ext}"
    filepath = os.path.join(settings.STORAGE_LOCAL_PATH, filename)

    os.makedirs(settings.STORAGE_LOCAL_PATH, exist_ok=True)
    with open(filepath, "wb") as f:
        f.write(content)

    image_url = f"/uploads/{filename}"

    # Run AI analysis
    try:
        result = await analyze_plant_image(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analiz sırasında hata oluştu: {str(e)}")

    # Save to database
    import json

    analysis = PlantAnalysis(
        id=uuid.uuid4(),
        user_id=current_user.id,
        image_url=image_url,
        overall_health=result["overall_health"],
        predictions_json=json.dumps(result["predictions"], ensure_ascii=False),
        recommendations_json=json.dumps(result["recommendations"], ensure_ascii=False),
    )
    db.add(analysis)
    await db.flush()

    return {
        "id": str(analysis.id),
        "image_url": image_url,
        "overall_health": result["overall_health"],
        "predictions": result["predictions"],
        "recommendations": result["recommendations"],
        "analyzed_at": datetime.utcnow().isoformat(),
    }

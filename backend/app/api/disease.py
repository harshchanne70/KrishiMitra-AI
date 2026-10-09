from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from backend.app.schemas.disease import LeafDiseasePrediction
from backend.app.services.disease_service import analyze_leaf_image

router = APIRouter(prefix="/disease", tags=["Disease Detection"])

MAX_IMAGE_SIZE = 10 * 1024 * 1024 # 10 MB

@router.post("/analyze", response_model=LeafDiseasePrediction)
async def analyze_leaf(
    file: UploadFile = File(...),
    color_hint: Optional[str] = Form(None)
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload an image file (JPEG, PNG, WebP).")

    contents = await file.read()
    if len(contents) > MAX_IMAGE_SIZE:
        raise HTTPException(status_code=400, detail="Image file exceeds maximum allowable size (10 MB).")

    if len(contents) < 500:
        raise HTTPException(status_code=400, detail="Image file is corrupted or too small.")

    result = await analyze_leaf_image(
        file_bytes=contents,
        filename=file.filename or "leaf.jpg",
        mime_type=file.content_type,
        color_hint=color_hint
    )
    return result

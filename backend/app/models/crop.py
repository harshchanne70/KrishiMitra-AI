import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Text, DateTime, JSON
from backend.app.core.database import Base

class CropCatalog(Base):
    __tablename__ = "crop_catalog"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    crop_id = Column(String(50), unique=True, index=True, nullable=False)
    name_en = Column(String(100), nullable=False)
    name_hi = Column(String(100), nullable=False)
    name_mr = Column(String(100), nullable=False)
    scientific_name = Column(String(150), nullable=True)
    icon = Column(String(20), default="🌾")
    water_req = Column(String(20), default="medium") # 'low', 'medium', 'high'
    min_ph = Column(Float, default=6.0)
    max_ph = Column(Float, default=7.5)
    suitable_soils = Column(JSON, default=list) # e.g. ["black", "clay", "alluvial"]
    suitable_seasons = Column(JSON, default=list) # e.g. ["kharif", "rabi"]
    varieties = Column(JSON, default=list) # e.g. [{"name": "JS 335", "maturity_days": 95}]
    growth_stages = Column(JSON, default=list) # ["Sowing", "Vegetative", "Flowering", "Pod/Grain Formation", "Harvesting"]
    duration_days = Column(String(50), default="90-120 days")
    expected_yield = Column(String(100), default="15-20 Quintals/Acre")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

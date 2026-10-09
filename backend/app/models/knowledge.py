import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, JSON
from backend.app.core.database import Base

class KnowledgeSource(Base):
    __tablename__ = "knowledge_sources"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    organization = Column(String(150), nullable=False) # e.g. "ICAR - Indian Council of Agricultural Research"
    publication_year = Column(String(20), default="2024")
    url = Column(String(500), nullable=True)
    category = Column(String(100), default="Agronomy & Crop Management")
    crop_targets = Column(JSON, default=list) # e.g. ["soybean", "cotton"]
    summary = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class KnowledgeBaseItem(Base):
    __tablename__ = "knowledge_base_items"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    crop_id = Column(String(50), index=True, nullable=False)
    growth_stage = Column(String(50), nullable=False) # e.g. "Vegetative", "Flowering"
    category = Column(String(50), nullable=False) # "irrigation", "soil", "pest", "fertilizer"
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    symptoms = Column(JSON, default=list)
    remedies = Column(JSON, default=list)
    source_reference = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

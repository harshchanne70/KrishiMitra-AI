import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text, JSON, Boolean
from backend.app.core.database import Base

class AdvisorySession(Base):
    __tablename__ = "advisory_sessions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True, index=True)
    profile_id = Column(String(36), ForeignKey("farmer_profiles.id"), nullable=True, index=True)
    farmer_name = Column(String(100), nullable=False)
    village = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    
    crop_id = Column(String(50), nullable=False)
    crop_name = Column(String(100), nullable=False)
    crop_variety = Column(String(100), nullable=True)
    growth_stage = Column(String(50), nullable=True)
    sowing_date = Column(String(50), nullable=True)
    allocated_area = Column(Float, nullable=True)
    area_unit = Column(String(20), default="acre")
    
    suitability_score = Column(Float, default=85.0)
    status = Column(String(30), default="completed") # 'draft', 'in_progress', 'completed'
    
    # Store complete structured snapshots
    farm_snapshot = Column(JSON, default=dict)
    weather_snapshot = Column(JSON, default=dict)
    irrigation_plan = Column(JSON, default=dict)
    disease_result = Column(JSON, nullable=True)
    advisory_output = Column(JSON, default=dict)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)

class UploadedLeafImage(Base):
    __tablename__ = "uploaded_leaf_images"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(36), ForeignKey("advisory_sessions.id"), nullable=True, index=True)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=True)
    file_size_bytes = Column(Float, default=0.0)
    mime_type = Column(String(50), default="image/jpeg")
    
    # Analysis metadata
    predicted_label = Column(String(100), nullable=True)
    confidence = Column(Float, nullable=True)
    model_name = Column(String(100), default="rule-based-heuristic-v1")
    is_demo = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class SystemAlert(Base):
    __tablename__ = "system_alerts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(36), ForeignKey("advisory_sessions.id"), nullable=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True, index=True)
    alert_type = Column(String(50), default="weather") # 'weather', 'disease', 'soil', 'scheme'
    severity = Column(String(20), default="warning") # 'info', 'warning', 'danger'
    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    is_dismissed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

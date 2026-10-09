import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text
from backend.app.core.database import Base

class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True, index=True)
    farmer_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    state = Column(String(100), nullable=False, default="Maharashtra")
    district = Column(String(100), nullable=False, default="Nagpur")
    village = Column(String(100), nullable=False)
    preferred_lang = Column(String(10), default="hi") # 'hi', 'mr', 'en'
    total_land = Column(Float, nullable=False, default=2.5)
    land_unit = Column(String(20), default="acre") # 'acre' or 'hectare'
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class Farm(Base):
    __tablename__ = "farms"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("farmer_profiles.id"), nullable=False, index=True)
    farm_name = Column(String(100), default="Main Farm Plot")
    soil_type = Column(String(50), nullable=False, default="black")
    ph = Column(Float, nullable=True)
    water_source = Column(String(50), nullable=False, default="borewell")
    water_availability = Column(String(20), nullable=False, default="medium")
    irrigation_method = Column(String(50), nullable=False, default="drip")
    current_season = Column(String(20), nullable=False, default="kharif")
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

from fastapi import APIRouter, Query
from typing import Optional
from backend.app.schemas.weather import WeatherResponse
from backend.app.services.weather_service import fetch_live_weather

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.get("/forecast", response_model=WeatherResponse)
async def get_weather_forecast(
    village: Optional[str] = Query("Nagpur", description="Village or town name"),
    district: Optional[str] = Query("Nagpur", description="District name"),
    state: Optional[str] = Query("Maharashtra", description="State name"),
    lat: Optional[float] = Query(None, description="Optional GPS latitude"),
    lon: Optional[float] = Query(None, description="Optional GPS longitude")
):
    return await fetch_live_weather(
        village=village or "Nagpur",
        district=district or "Nagpur",
        state_name=state or "Maharashtra",
        lat=lat,
        lon=lon
    )

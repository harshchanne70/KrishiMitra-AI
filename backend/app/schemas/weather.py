from pydantic import BaseModel
from typing import List, Optional

class WeatherDayForecast(BaseModel):
    label: str
    date_str: str
    temp_max: float
    temp_min: float
    rain_probability: int # 0-100%
    humidity: int # %
    wind_speed: float # km/h
    condition: str # sunny, cloudy, rain, storm
    condition_icon: str
    advisory_hint: str

class WeatherQuery(BaseModel):
    village: Optional[str] = "Nagpur"
    district: Optional[str] = "Nagpur"
    state: Optional[str] = "Maharashtra"
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class WeatherResponse(BaseModel):
    location_name: str
    source: str # "Open-Meteo Live API" or "Simulated Agromet Demonstration"
    is_live_api: bool
    current_temp: float
    current_humidity: int
    current_rain_prob: int
    current_wind: float
    current_condition: str
    current_icon: str
    advisory_recommendation: str
    forecast: List[WeatherDayForecast]

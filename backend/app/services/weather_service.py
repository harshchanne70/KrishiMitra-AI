import httpx
import math
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from backend.app.schemas.weather import WeatherResponse, WeatherDayForecast

# Well known district coordinate mappings for Indian agricultural centers
INDIAN_DISTRICT_COORDS: Dict[str, Dict[str, float]] = {
    "nagpur": {"lat": 21.1458, "lon": 79.0882},
    "nashik": {"lat": 19.9975, "lon": 73.7898},
    "pune": {"lat": 18.5204, "lon": 73.8567},
    "amravati": {"lat": 20.9374, "lon": 77.7796},
    "aurangabad": {"lat": 19.8762, "lon": 75.3433},
    "ludhiana": {"lat": 30.9010, "lon": 75.8573},
    "indore": {"lat": 22.7196, "lon": 75.8577},
    "bhopal": {"lat": 23.2599, "lon": 77.4126},
    "varanasi": {"lat": 25.3176, "lon": 82.9739},
    "patna": {"lat": 25.5941, "lon": 85.1376},
    "ahmedabad": {"lat": 23.0225, "lon": 72.5714},
    "jaipur": {"lat": 26.9124, "lon": 75.7873},
    "delhi": {"lat": 28.6139, "lon": 77.2090},
    "hyderabad": {"lat": 17.3850, "lon": 78.4867},
    "bengaluru": {"lat": 12.9716, "lon": 77.5946}
}

def get_coords(district: str, village: str, state: str) -> Dict[str, float]:
    d_clean = (district or "").lower().strip()
    if d_clean in INDIAN_DISTRICT_COORDS:
        return INDIAN_DISTRICT_COORDS[d_clean]
    v_clean = (village or "").lower().strip()
    if v_clean in INDIAN_DISTRICT_COORDS:
        return INDIAN_DISTRICT_COORDS[v_clean]
    # Default central India (Maharashtra / MP agricultural belt)
    return {"lat": 21.1458, "lon": 79.0882}

async def fetch_live_weather(
    village: str,
    district: str,
    state_name: str,
    lat: Optional[float] = None,
    lon: Optional[float] = None
) -> WeatherResponse:
    """
    Fetches real live agromet data from Open-Meteo public API.
    If network is unreachable or times out, returns clearly labeled offline demo data.
    """
    coords = {"lat": lat, "lon": lon} if (lat and lon) else get_coords(district, village, state_name)
    latitude = coords["lat"]
    longitude = coords["lon"]
    display_location = f"{village or district or 'Central Region'}, {district or state_name}"

    try:
        url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "current": "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code",
            "daily": "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max",
            "timezone": "auto",
            "forecast_days": 5
        }
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(url, params=params)
            if resp.status_code == 200:
                data = resp.json()
                current = data.get("current", {})
                daily = data.get("daily", {})
                
                curr_temp = round(float(current.get("temperature_2m", 28.5)), 1)
                curr_hum = int(current.get("relative_humidity_2m", 55))
                curr_wind = round(float(current.get("wind_speed_10m", 12.0)), 1)
                curr_code = int(current.get("weather_code", 0))
                
                # WMO weather code mapping
                curr_cond, curr_icon = map_wmo_code(curr_code)
                
                dates = daily.get("time", [])
                max_temps = daily.get("temperature_2m_max", [])
                min_temps = daily.get("temperature_2m_min", [])
                rain_probs = daily.get("precipitation_probability_max", [])
                winds = daily.get("wind_speed_10m_max", [])
                codes = daily.get("weather_code", [])
                
                curr_rain_prob = int(rain_probs[0]) if rain_probs else 10
                
                forecast_list: List[WeatherDayForecast] = []
                day_names = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5"]
                
                for idx in range(min(5, len(dates))):
                    d_code = int(codes[idx]) if idx < len(codes) else 0
                    cond_name, icon_symbol = map_wmo_code(d_code)
                    r_prob = int(rain_probs[idx]) if idx < len(rain_probs) else 0
                    
                    hint = "Normal farming activities can proceed."
                    if r_prob >= 70:
                        hint = "Heavy rain expected; withhold foliar spraying and irrigation."
                    elif r_prob >= 40:
                        hint = "Moderate showers possible; monitor fields."
                    elif max_temps[idx] >= 38:
                        hint = "High thermal heat; irrigate during evening hours."

                    forecast_list.append(WeatherDayForecast(
                        label=day_names[idx] if idx < len(day_names) else f"Day {idx+1}",
                        date_str=dates[idx],
                        temp_max=round(float(max_temps[idx]), 1),
                        temp_min=round(float(min_temps[idx]), 1),
                        rain_probability=r_prob,
                        humidity=curr_hum,
                        wind_speed=round(float(winds[idx]), 1) if idx < len(winds) else 10.0,
                        condition=cond_name,
                        condition_icon=icon_symbol,
                        advisory_hint=hint
                    ))

                rec = "Favorable agricultural conditions. Follow regular crop monitoring."
                if curr_rain_prob >= 60:
                    rec = "Rain forecast imminent. Postpone irrigation and fertilizer top-dressing."
                elif curr_temp >= 38:
                    rec = "High temperature alert. Ensure adequate soil moisture to protect crops from heat stress."

                return WeatherResponse(
                    location_name=display_location,
                    source="Open-Meteo Live Agromet API",
                    is_live_api=True,
                    current_temp=curr_temp,
                    current_humidity=curr_hum,
                    current_rain_prob=curr_rain_prob,
                    current_wind=curr_wind,
                    current_condition=curr_cond,
                    current_icon=curr_icon,
                    advisory_recommendation=rec,
                    forecast=forecast_list
                )
    except Exception as exc:
        # Fallback to clearly labeled deterministic agromet simulation
        pass

    return generate_deterministic_demo_weather(display_location)

def map_wmo_code(code: int) -> tuple[str, str]:
    if code in (0, 1):
        return ("Sunny / Clear", "☀️")
    elif code in (2, 3):
        return ("Partly Cloudy", "⛅")
    elif code in (45, 48):
        return ("Foggy", "🌫️")
    elif code in (51, 53, 55, 61, 63, 65, 80, 81):
        return ("Rain Showers", "🌧️")
    elif code in (71, 73, 75, 77):
        return ("Hail / Snow", "🌨️")
    elif code in (95, 96, 99):
        return ("Thunderstorm", "⛈️")
    return ("Clear Sky", "☀️")

def generate_deterministic_demo_weather(location_name: str) -> WeatherResponse:
    """Deterministic simulated fallback with clear demo labeling"""
    today = datetime.now()
    days_labels = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5"]
    forecast: List[WeatherDayForecast] = []
    
    # Deterministic pattern
    base_t = 30.0
    for i in range(5):
        d_date = (today + timedelta(days=i)).strftime("%Y-%m-%d")
        t_max = base_t + (i % 3) * 1.5 - (i % 2) * 1.0
        t_min = t_max - 8.0
        r_prob = 15 if i != 2 else 65
        cond = "Sunny" if r_prob < 40 else "Showers"
        icon = "☀️" if r_prob < 40 else "🌧️"
        hint = "Normal field irrigation" if r_prob < 40 else "Rain anticipated; delay scheduled watering"

        forecast.append(WeatherDayForecast(
            label=days_labels[i],
            date_str=d_date,
            temp_max=round(t_max, 1),
            temp_min=round(t_min, 1),
            rain_probability=r_prob,
            humidity=55 + (i * 4),
            wind_speed=12.5,
            condition=cond,
            condition_icon=icon,
            advisory_hint=hint
        ))

    return WeatherResponse(
        location_name=location_name,
        source="Simulated Agromet Demonstration (Offline Fallback)",
        is_live_api=False,
        current_temp=30.5,
        current_humidity=58,
        current_rain_prob=20,
        current_wind=14.0,
        current_condition="Partly Cloudy (Demo Mode)",
        current_icon="⛅",
        advisory_recommendation="Demo Mode: Simulated weather conditions shown. No live internet API connection active.",
        forecast=forecast
    )

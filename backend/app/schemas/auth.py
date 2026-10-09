from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserRegister(BaseModel):
    phone: Optional[str] = Field(None, description="10 digit Indian mobile number")
    email: Optional[str] = None
    full_name: str = Field(..., min_length=2, max_length=100)
    password: Optional[str] = Field(None, min_length=6)
    role: str = "farmer"

class UserLogin(BaseModel):
    identifier: str = Field(..., description="Phone number or Email")
    password: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    full_name: str
    role: str

class UserResponse(BaseModel):
    id: str
    phone: Optional[str]
    email: Optional[str]
    full_name: str
    role: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}

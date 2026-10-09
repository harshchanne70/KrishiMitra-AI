import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.core.security import hash_password, verify_password, create_access_token, decode_access_token
from backend.app.models.user import User
from backend.app.models.profile import FarmerProfile
from backend.app.schemas.auth import UserRegister, UserLogin, Token, UserResponse
from fastapi.security import OAuth2PasswordBearer
from typing import Optional

router = APIRouter(prefix="/auth", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

def get_current_user_optional(token: Optional[str] = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Optional[User]:
    if not token:
        return None
    payload = decode_access_token(token)
    if not payload:
        return None
    user_id = payload.get("sub")
    if not user_id:
        return None
    return db.query(User).filter(User.id == user_id).first()

def get_current_user(user: Optional[User] = Depends(get_current_user_optional)) -> User:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided or invalid"
        )
    return user

@router.post("/register", response_model=Token)
def register_farmer(data: UserRegister, db: Session = Depends(get_db)):
    # Check phone or email duplicate
    if data.phone:
        existing_phone = db.query(User).filter(User.phone == data.phone).first()
        if existing_phone:
            raise HTTPException(status_code=400, detail="Mobile number already registered. Please login.")
    if data.email:
        existing_email = db.query(User).filter(User.email == data.email).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already registered. Please login.")

    hashed_pw = hash_password(data.password) if data.password else None
    new_user = User(
        id=str(uuid.uuid4()),
        phone=data.phone,
        email=data.email,
        full_name=data.full_name,
        hashed_password=hashed_pw,
        role=data.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Automatically create empty farmer profile
    profile = FarmerProfile(
        id=str(uuid.uuid4()),
        user_id=new_user.id,
        farmer_name=new_user.full_name,
        phone=new_user.phone,
        village="Local Village",
        state="Maharashtra",
        district="Nagpur"
    )
    db.add(profile)
    db.commit()

    token = create_access_token(data={"sub": new_user.id, "role": new_user.role, "name": new_user.full_name})
    return Token(
        access_token=token,
        user_id=new_user.id,
        full_name=new_user.full_name,
        role=new_user.role
    )

@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    ident = data.identifier.strip()
    user = db.query(User).filter((User.phone == ident) | (User.email == ident)).first()
    
    if not user:
        # For prototype simplicity: if user enters a valid 10-digit number that isn't in db yet, auto-create farmer
        if len(ident) == 10 and ident.isdigit():
            user = User(
                id=str(uuid.uuid4()),
                phone=ident,
                full_name=f"Farmer {ident[-4:]}",
                role="farmer"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            raise HTTPException(status_code=400, detail="User account not found. Please register.")

    if user.hashed_password and data.password:
        if not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Invalid password.")

    token = create_access_token(data={"sub": user.id, "role": user.role, "name": user.full_name})
    return Token(
        access_token=token,
        user_id=user.id,
        full_name=user.full_name,
        role=user.role
    )

@router.post("/guest", response_model=Token)
def guest_login():
    """Allows farmers or evaluators to test the full system instantly without entering credentials"""
    guest_id = f"guest-{uuid.uuid4().hex[:8]}"
    token = create_access_token(data={"sub": guest_id, "role": "farmer", "name": "Pratap Patil (Guest)"})
    return Token(
        access_token=token,
        user_id=guest_id,
        full_name="Pratap Patil (Guest)",
        role="farmer"
    )

@router.get("/me", response_model=UserResponse)
def get_me(user: User = Depends(get_current_user)):
    return user

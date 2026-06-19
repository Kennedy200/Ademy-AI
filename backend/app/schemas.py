from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Optional[str] = "student" 

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GoogleToken(BaseModel):
    token: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    full_name: str
    picture: Optional[str] = None # New field for Gmail photo

class QuizResultSchema(BaseModel):
    id: int
    module_id: int
    score: float
    taken_at: str

    class Config:
        from_attributes = True
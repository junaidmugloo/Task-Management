from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    email: str
    city: str | None = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    city: str | None = None

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

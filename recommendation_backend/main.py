from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel

# Database Connection URL (Use `host.docker.internal` for Docker MySQL)
DATABASE_URL = "mysql+mysqlconnector://root:123456Aa@localhost:3307/recommendation_backend"

# SQLAlchemy Setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define a Sample Model
class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))

# Create Tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic model for user data
class UserCreate(BaseModel):
    name: str

# Pydantic model for user response
class UserResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

# Sample Route
@app.get("/")
def read_root():
    return {"message": "Welcome to the User API"}

# Endpoint to get a user by ID
@app.get("/user/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
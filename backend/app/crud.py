from sqlalchemy.orm import Session
from . import models
from .auth import get_password_hash, verify_password

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, email: str, password: str):
    user = models.User(email=email, hashed_password=get_password_hash(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

def get_tasks(db: Session, owner_id: int):
    return db.query(models.Task).filter(models.Task.owner_id == owner_id).all()

def get_task(db: Session, task_id: int, owner_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id, models.Task.owner_id == owner_id).first()

def create_task(db: Session, owner_id: int, title: str, description: str = None, status: str = "todo"):
    task = models.Task(title=title, description=description, status=status, owner_id=owner_id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def update_task(db: Session, task: models.Task, **fields):
    for key, value in fields.items():
        if value is not None:
            setattr(task, key, value)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task: models.Task):
    db.delete(task)
    db.commit()

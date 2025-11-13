# Simple helper to create tables (run once)
from app.database import engine, Base
from app import models

def create():
    Base.metadata.create_all(bind=engine)
    print('Tables created')

if __name__ == '__main__':
    create()

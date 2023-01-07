from sqlalchemy.orm import Session

from . import models, schemas


def get_developer(db: Session, developer_id: int):
    return db.query(models.Developer).filter(models.Developer.id == developer_id).first()

def get_developer_by_name(db: Session, name: str):
    return db.query(models.Developer).filter(models.Developer.name == name).first()

def get_developers(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Developer).offset(skip).limit(limit).all()

def get_developers_by_filter(db: Session, filter: schemas.DeveloperBase):
    return db.query(models.Developer).filter_by(**dict(filter)).all()

def create_developer(db: Session, developer: schemas.DeveloperBase):
    db_developer = models.Developer(
        manufacturer=developer.manufacturer,
        name=developer.name,
        type=developer.type,
        )

    db.add(db_developer)
    db.commit()
    db.refresh(db_developer)
    return db_developer

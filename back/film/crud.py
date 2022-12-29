from sqlalchemy.orm import Session

from . import models, schemas


def get_film(db: Session, film_id: int):
    return db.query(models.Film).filter(models.Film.id == film_id).first()


def get_film_by_name(db: Session, name: str):
    return db.query(models.Film).filter(ilike(models.Film.name, name)).first()

def get_films(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Film).offset(skip).limit(limit).all()

def get_films_by_iso(db: Session, iso: int):
    return db.query(models.Film).filter(models.Film.iso == iso).all()




def create_user(db: Session, user: schemas.FilmCreate):
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

from sqlalchemy.orm import Session

from . import models, schemas


def get_film(db: Session, film_id: int):
    return db.query(models.Film).filter(models.Film.id == film_id).first()

def get_film_by_name(db: Session, name: str):
    return db.query(models.Film).filter(models.Film.name == name).first()

def get_films(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Film).offset(skip).limit(limit).all()

def get_films_by_filter(db: Session, filter: schemas.FilmBase):
    return db.query(models.Film).filter_by(**dict(filter)).all()

def create_film(db: Session, film: schemas.FilmBase):
    db_film = models.Film(
        manufacturer=film.manufacturer,
        name=film.name,
        iso=film.iso,
        type=film.type,
        )

    db.add(db_film)
    db.commit()
    db.refresh(db_film)
    return db_film

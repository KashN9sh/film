from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas, crud
from dependencies import get_db

router = APIRouter(
    prefix="/film",
    tags=["film"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Film)
def create_film(film: schemas.FilmBase, db: Session = Depends(get_db)):
    db_film = crud.get_film_by_name(db, name=film.name)
    if db_film:
        raise HTTPException(status_code=400, detail="Film already exist")
    return crud.create_film(db=db, film=film)


@router.get("/", response_model=list[schemas.Film])
def read_films(skip: int = 0, limit: int = 6, db: Session = Depends(get_db)):
    films = crud.get_films(db, skip=skip, limit=limit)
    return films


@router.post("/filter", response_model=list[schemas.Film])
def read_films_by_filter(filter: schemas.FilmBase, db: Session = Depends(get_db)):
    films = crud.get_films_by_filter(db, filter=filter)
    if not len(films):
        raise HTTPException(status_code=404, detail="Films not found")
    return films

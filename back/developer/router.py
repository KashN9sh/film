from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas, crud
from dependencies import get_db

router = APIRouter(
    prefix="/developer",
    tags=["developer"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Developer)
def create_developer(developer: schemas.DeveloperBase, db: Session = Depends(get_db)):
    db_developer = crud.get_developer_by_name(db, name=developer.name)
    if db_developer:
        raise HTTPException(status_code=400, detail="Developer already exist")
    return crud.create_film(db=db, developer=developer)


@router.get("/", response_model=list[schemas.Developer])
def read_developers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    developers = crud.get_developers(db, skip=skip, limit=limit)
    return developers


@router.post("/filter", response_model=list[schemas.Developer])
def read_developers_by_filter(filter: schemas.DeveloperBase, db: Session = Depends(get_db)):
    developers = crud.get_developers_by_filter(db, filter=filter)
    if not len(developers):
        raise HTTPException(status_code=404, detail="Developers not found")
    return developers

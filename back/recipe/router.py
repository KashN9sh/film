from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas, crud
from dependencies import get_db

router = APIRouter(
    prefix="/recipe",
    tags=["recipe"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Recipe)
def create_recipe(recipe: schemas.RecipeBase, db: Session = Depends(get_db)):
    db_recipes = crud.get_recipes_by_filter(db, recipe)
    if db_recipes:
        raise HTTPException(status_code=400, detail="Recipe already exist")
    return crud.create_recipe(db=db, recipe=recipe)

@router.post("/filter", response_model=list[schemas.Recipe])
def read_recipes_by_filter(filter: schemas.RecipeBase, db: Session = Depends(get_db)):
    recipes = crud.get_recipes_by_filter(db, filter=filter)
    if not len(recipes):
        raise HTTPException(status_code=404, detail="Recipes not found")
    return recipes

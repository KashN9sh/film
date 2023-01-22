from sqlalchemy.orm import Session

from . import models, schemas

#
# def get_recipe(db: Session, recipe_id: int):
#     return db.query(models.Recipe).filter(models.Recipe.id == recipe_id).first()

def get_recipes_by_filter(db: Session, filter: schemas.RecipeBase, skip: int = 0, limit: int = 10):
    filter = {k: v for k, v in dict(filter).items() if v is not None}
    return db.query(models.Recipe).filter_by(**(filter)).offset(skip).limit(limit).all()

def create_recipe(db: Session, recipe: schemas.RecipeBase):
    db_recipe = models.Recipe(
        iso=recipe.iso,
        film_id=recipe.film_id,
        developer_id=recipe.developer_id,
        time=recipe.time
        )

    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

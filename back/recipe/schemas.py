from pydantic import BaseModel

class RecipeBase(BaseModel):
    iso: int = None
    film_id: int
    developer_id: int
    time: int = None


class Recipe(RecipeBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

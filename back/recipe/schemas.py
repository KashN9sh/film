from pydantic import BaseModel

class RecipeBase(BaseModel):
    iso: int
    film_id: int
    developer_id: int
    time: int


class Recipe(RecipeBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

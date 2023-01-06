from pydantic import BaseModel

class FilmBase(BaseModel):
    manufacturer: str
    name: str
    iso: int
    type: str


class Film(FilmBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

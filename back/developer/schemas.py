from pydantic import BaseModel

class DeveloperBase(BaseModel):
    manufacturer: str
    name: str
    type: str #нормальные, контрастные, быстродействующие, мягкие, мелкозернистые и специальные


class Developer(DeveloperBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

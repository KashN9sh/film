from database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

class Recipe(Base):
    __tablename__ = "recipe"

    id = Column(Integer, primary_key=True, index=True)
    is_active = Column(Boolean, default=True)
    iso = Column(Integer)
    time = Column(Integer)

    film_id = Column(Integer, ForeignKey("film.id"))
    developer_id = Column(Integer, ForeignKey("developer.id"))

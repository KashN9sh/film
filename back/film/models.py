from lib.database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

class Film(Base):
    __tablename__ = "film"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    is_active = Column(Boolean, default=True)
    iso = Column(Integer)
    type = Column(String)

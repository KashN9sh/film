from database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

class Developer(Base):
    __tablename__ = "developer"

    id = Column(Integer, primary_key=True, index=True)
    manufacturer = Column(String, index=True)
    name = Column(String, index=True)
    is_active = Column(Boolean, default=True)
    type = Column(String)

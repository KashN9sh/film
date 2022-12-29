from lib.database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    nickname = Column(String)
    is_active = Column(Boolean, default=True)

class WhyILoveNikusha(Base):
    __tablename__ = "why_i_love_nikusha"

    potomu = Column(Integer, primary_key=True, index=True)
    chto = Column(String, unique=True, index=True)
    ona = Column(String)
    bubupka = Column(String)
    umnica = Column(Boolean, default=True)
    kotik = Column(Boolean, default=True)
    zayka = Column(Boolean, default=True)
    milashka = Column(Boolean, default=True)

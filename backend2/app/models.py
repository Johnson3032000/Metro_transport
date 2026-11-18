
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class MetroLine(Base):

    __tablename__ = "metro_lines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    color = Column(String(20))


class MetroStation(Base):

    __tablename__ = "metro_stations"

    id = Column(Integer, primary_key=True, index=True)
    line_id = Column(Integer, ForeignKey("metro_lines.id"))
    name = Column(String(100))
    latitude = Column(Float)
    longitude = Column(Float)

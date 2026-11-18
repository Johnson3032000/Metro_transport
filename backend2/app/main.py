
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import engine, Base, SessionLocal
from app.models import MetroLine, MetroStation
from app.data import lines

app = FastAPI()


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create database tables
Base.metadata.create_all(bind=engine)


# Insert data into MySQL
def insert_data():

    db = SessionLocal()

    try:

        if db.query(MetroLine).first():
            return

        for line in lines:

            new_line = MetroLine(
                name=line["name"],
                color=line["color"]
            )

            db.add(new_line)
            db.commit()
            db.refresh(new_line)

            for station in line["stations"]:

                new_station = MetroStation(
                    line_id=new_line.id,
                    name=station[0],
                    latitude=station[1],
                    longitude=station[2]
                )

                db.add(new_station)

        db.commit()

    finally:
        db.close()


insert_data()


# Database connection
def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# API endpoint
@app.get("/api/lines")
def get_lines(db: Session = Depends(get_db)):

    result = []

    all_lines = db.query(MetroLine).all()

    for line in all_lines:

        stations = db.query(MetroStation).filter(
            MetroStation.line_id == line.id
        ).all()

        result.append({
            "id": line.id,
            "name": line.name,
            "color": line.color,

            "stations": [
                {
                    "name": station.name,
                    "position": [
                        station.latitude,
                        station.longitude
                    ]
                }
                for station in stations
            ]
        })

    return result

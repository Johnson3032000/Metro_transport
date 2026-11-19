
# from fastapi import FastAPI, Depends
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session

# from app.database import engine, Base, SessionLocal
# from app.models import MetroLine, MetroStation
# from app.data import lines

# app = FastAPI()


# # CORS Configuration
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # Create database tables
# Base.metadata.create_all(bind=engine)


# # Insert data into MySQL
# def insert_data():

#     db = SessionLocal()

#     try:

#         if db.query(MetroLine).first():
#             return

#         for line in lines:

#             new_line = MetroLine(
#                 name=line["name"],
#                 color=line["color"]
#             )

#             db.add(new_line)
#             db.commit()
#             db.refresh(new_line)

#             for station in line["stations"]:

#                 new_station = MetroStation(
#                     line_id=new_line.id,
#                     name=station[0],
#                     latitude=station[1],
#                     longitude=station[2]
#                 )

#                 db.add(new_station)

#         db.commit()

#     finally:
#         db.close()


# insert_data()


# # Database connection
# def get_db():

#     db = SessionLocal()

#     try:
#         yield db
#     finally:
#         db.close()


# # API endpoint
# @app.get("/api/lines")
# def get_lines(db: Session = Depends(get_db)):

#     result = []

#     all_lines = db.query(MetroLine).all()

#     for line in all_lines:

#         stations = db.query(MetroStation).filter(
#             MetroStation.line_id == line.id
#         ).all()

#         result.append({
#             "id": line.id,
#             "name": line.name,
#             "color": line.color,

#             "stations": [
#                 {
#                     "name": station.name,
#                     "position": [
#                         station.latitude,
#                         station.longitude
#                     ]
#                 }
#                 for station in stations
#             ]
#         })

#     return result







from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import engine, Base, SessionLocal
from app.models import MetroLine, MetroStation
from app.data import lines

app = FastAPI()

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

Base.metadata.create_all(bind=engine)


# Database synchronization
def insert_data():

    db = SessionLocal()

    try:
        for line_data in lines:

            metro_line = db.query(MetroLine).filter(
                MetroLine.name == line_data["name"]
            ).first()

            if not metro_line:
                metro_line = MetroLine(
                    name=line_data["name"],
                    color=line_data["color"]
                )
                db.add(metro_line)
                db.flush()
            else:
                metro_line.color = line_data["color"]

            existing = db.query(MetroStation).filter(
                MetroStation.line_id == metro_line.id
            ).all()

            station_map = {
                s.name: s for s in existing
            }

            new_names = set()

            for s in line_data["stations"]:

                name, lat, lon = s
                new_names.add(name)

                if name in station_map:

                    station_map[name].latitude = lat
                    station_map[name].longitude = lon

                else:

                    db.add(MetroStation(
                        line_id=metro_line.id,
                        name=name,
                        latitude=lat,
                        longitude=lon
                    ))

            for station in existing:
                if station.name not in new_names:
                    db.delete(station)

        db.commit()

        print("Metro data updated successfully!")

    except Exception as e:
        db.rollback()
        print("Error:", e)
        raise

    finally:
        db.close()


@app.on_event("startup")
def startup_event():
    insert_data()


# Database connection
def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# Get all metro lines and stations
@app.get("/api/lines")
def get_lines(db: Session = Depends(get_db)):

    result = []

    all_lines = db.query(MetroLine).all()

    for line in all_lines:

        stations = db.query(MetroStation).filter(
            MetroStation.line_id == line.id
        ).all()

        station_map = {
            station.name: station
            for station in stations
        }

        # Preserve station order from data.py
        line_data = next(
            (item for item in lines if item["name"] == line.name),
            None
        )

        ordered_stations = []

        if line_data:

            for station_data in line_data["stations"]:

                station = station_map.get(station_data[0])

                if station:

                    ordered_stations.append({
                        "name": station.name,
                        "position": [
                            station.latitude,
                            station.longitude
                        ]
                    })

        result.append({
            "id": line.id,
            "name": line.name,
            "color": line.color,
            "stations": ordered_stations
        })

    return result


@app.get("/")
def home():
    return {
        "message": "Chennai Metro API is running"
    }



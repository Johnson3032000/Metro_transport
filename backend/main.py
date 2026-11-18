import os
from contextlib import contextmanager

import mysql.connector
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Read values from backend/.env
load_dotenv()

app = FastAPI(title="Chennai Transport API")

origins = [
    o.strip()
    for o in os.getenv("FRONTEND_ORIGINS", "http://localhost:5173").split(",")
    if o.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "chennai_transport"),
    )


@contextmanager
def db_cursor(dictionary=False):
    """Opens a connection, commits on success, always closes."""
    db = get_db()
    cursor = db.cursor(dictionary=dictionary)
    try:
        yield cursor
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        cursor.close()
        db.close()


def save_files(cursor, transport_id, files):
    for file_name in files or []:
        cursor.execute(
            "INSERT INTO transport_files (transport_id, file_name) VALUES (%s, %s)",
            (transport_id, file_name),
        )


@app.get("/health")
def health():
    with db_cursor() as cursor:
        cursor.execute("SELECT 1")
        cursor.fetchone()
    return {"status": "ok"}


@app.get("/transports")
def get_transports():
    with db_cursor(dictionary=True) as cursor:
        cursor.execute("SELECT * FROM transport")
        transports = cursor.fetchall()

        for item in transports:
            cursor.execute(
                "SELECT file_name FROM transport_files WHERE transport_id=%s",
                (item["id"],),
            )
            item["files"] = [row["file_name"] for row in cursor.fetchall()]

            if item.get("updated_date"):
                item["updated_date"] = str(item["updated_date"])

    return transports


@app.post("/transports")
def add_transport(data: dict):
    if not data.get("name"):
        raise HTTPException(status_code=422, detail="name is required")

    with db_cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO transport
            (name, description, updated_date, size, color, background, download_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            (
                data["name"],
                data.get("description"),
                data.get("updated_date"),
                data.get("size"),
                data.get("color"),
                data.get("background"),
                data.get("download_url"),
            ),
        )
        transport_id = cursor.lastrowid
        save_files(cursor, transport_id, data.get("files"))

    return {"message": "Transport added successfully", "id": transport_id}


@app.put("/transports/{transport_id}")
def update_transport(transport_id: int, data: dict):
    if not data.get("name"):
        raise HTTPException(status_code=422, detail="name is required")

    with db_cursor() as cursor:
        cursor.execute("SELECT id FROM transport WHERE id=%s", (transport_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Transport not found")

        cursor.execute(
            """
            UPDATE transport
            SET name=%s, description=%s, updated_date=%s,
                size=%s, color=%s, background=%s, download_url=%s
            WHERE id=%s
            """,
            (
                data["name"],
                data.get("description"),
                data.get("updated_date"),
                data.get("size"),
                data.get("color"),
                data.get("background"),
                data.get("download_url"),
                transport_id,
            ),
        )

        cursor.execute(
            "DELETE FROM transport_files WHERE transport_id=%s", (transport_id,)
        )
        save_files(cursor, transport_id, data.get("files"))

    return {"message": "Transport updated successfully"}


@app.delete("/transports/{transport_id}")
def delete_transport(transport_id: int):
    with db_cursor() as cursor:
        cursor.execute("DELETE FROM transport WHERE id=%s", (transport_id,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Transport not found")

    return {"message": "Transport deleted successfully"}
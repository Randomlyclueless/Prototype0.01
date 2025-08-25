import sqlite3
import pandas as pd
import os
from datetime import datetime

DB_PATH = "gradai.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            event_type TEXT,
            metadata TEXT,
            timestamp TEXT
        )
    """)
    conn.commit()
    conn.close()

def log_event(user_id, event_type, metadata=""):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO events (user_id, event_type, metadata, timestamp)
        VALUES (?, ?, ?, ?)
    """, (user_id, event_type, metadata, datetime.utcnow().isoformat()))
    conn.commit()
    conn.close()

def get_events():
    if not os.path.exists(DB_PATH):
        return pd.DataFrame()
    conn = sqlite3.connect(DB_PATH)
    df = pd.read_sql_query("SELECT * FROM events", conn)
    conn.close()
    return df

# Initialize DB
init_db()

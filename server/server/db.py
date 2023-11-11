import psycopg2
import os
from dotenv import load_dotenv
from psycopg2.extras import DictCursor

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')


class DatabaseConnection:
    def __enter__(self):
        self.db = psycopg2.connect(DATABASE_URL)
        self.cursor = self.db.cursor(cursor_factory=DictCursor)
        return self.cursor

    def __exit__(self, exc_type, exc_value, traceback):
        self.db.commit()
        self.cursor.close()
        self.db.close()

# import psycopg2
import os
from dotenv import load_dotenv
# from psycopg2.extras import DictCursor
import asyncpg
# from asyncpg import connect
import asyncio


load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')


class DatabaseConnection:
    async def __aenter__(self):
        self.db = await asyncpg.connect(DATABASE_URL)
        return self.db

    async def __aexit__(self, exc_type, exc_value, traceback):
        await self.db.close()


async def create_canvas(background_color):
    async with DatabaseConnection() as db:
        result = await db.fetchval(
            "INSERT INTO canvas(background_color) VALUES ($1) RETURNING id;",
            background_color
        )
        return result


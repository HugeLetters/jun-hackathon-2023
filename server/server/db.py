import os
from dotenv import load_dotenv
import asyncpg

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')


class DatabaseConnection:
    async def __aenter__(self):
        self.db = await asyncpg.connect(DATABASE_URL)
        return self.db

    async def __aexit__(self, exc_type, exc_value, traceback):
        await self.db.close()


async def create_project(background_color):
    async with DatabaseConnection() as db:
        result = await db.fetchval(
            "INSERT INTO projects(background_color) VALUES ($1) RETURNING id;",
            background_color
        )
        return result


async def create_element(
        project_id,
        type,
        position_x,
        position_y,
        size_x,
        size_y,
        opacity
):
    async with DatabaseConnection() as db:
        result = await db.fetchval(
            '''
            INSERT INTO
                elements(
                    project_id,
                    type,
                    position_x,
                    position_y,
                    size_x,
                    size_y,
                    opacity
                )
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id;
            ''',
            project_id, type, position_x, position_y, size_x, size_y, opacity
        )
        return result


async def update_element(id: int, param, value):
    async with DatabaseConnection() as db:
        result = await db.fetchval(
            f'''
                UPDATE elements
                SET {param} = $2
                WHERE id = $1
                RETURNING {param};
            ''',
            id, value
        )
        return result


async def delete_element(id: int):
    async with DatabaseConnection() as db:
        await db.fetchval(
            '''
                DELETE FROM elements
                WHERE id = $1;
            ''',
            id
        )


async def read_element(id: int):
    async with DatabaseConnection() as db:
        result = await db.fetchrow(
            '''
                SELECT * FROM elements WHERE id = $1;
            ''',
            id
        )
        if result:
            result_dict = dict(result)
            return result_dict
        return result


async def get_elements(project_id: int):
    async with DatabaseConnection() as db:
        result = await db.fetch(
            '''
                SELECT id FROM elements WHERE project_id = $1;
            ''',
            project_id
        )
        print('########')
        print(result)
        if result:
            result_list = list(result)
            return result_list
        return []

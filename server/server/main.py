from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from pydantic_settings import BaseSettings
import json
import db

app = FastAPI(root_path="/api/")
print("Server started")


class Settings(BaseSettings):
    secret_key: str
    database_url: str


settings = Settings()

app.secret_key = settings.secret_key
database_url = settings.database_url


@app.post("/projects/")
async def add_project(background_color: str = 'white') -> dict:
    project_id = await db.create_project(background_color)
    return {"project_id": project_id}


@app.post("/elements/")
async def add_element(
        project_id: int,
        type: str,
        position_x: float,
        position_y: float,
        size_x: float,
        size_y: float,
        opacity: float
) -> dict:
    element_id = await db.create_element(
        project_id,
        type,
        position_x,
        position_y,
        size_x,
        size_y,
        opacity
    )
    return {"element_id": element_id}


#  params_for_update словарь с ключами и новыми значениями
# например {"type": "QQAZWS", "position_x": 123.123}
# возвращает словарь обновленных значений
@app.put("/elements/{element_id}")
async def update_element(element_id: int, params_for_update: dict) -> dict:
    resulted_values = {}
    for param, value in params_for_update.items():
        new_val = await db.update_element(element_id, param, value)
        resulted_values[param] = new_val
    return resulted_values


@app.delete("/elements/{element_id}")
async def delete_element(element_id: int):
    await db.delete_element(element_id)
    return 'element deleted'


@app.get("/elements/{element_id}")
async def read_element(element_id: int) -> dict:
    element = await db.read_element(element_id)
    return element


@app.get("/projects/{project_id}/elements/")
async def get_project_elements(project_id: int) -> list:
    elements = await db.get_elements(project_id)
    return elements


# generate json spec file - required for client
with open('openapi.json', 'w') as f:
    json.dump(get_openapi(
        title=app.title,
        version=app.version,
        openapi_version=app.openapi_version,
        description=app.description,
        routes=app.routes,
    ), f)

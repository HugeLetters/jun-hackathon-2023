from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from pydantic import BaseModel
from pydantic_settings import BaseSettings
from typing import Union
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

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


class Hello(BaseModel):
    Greeting: str


@app.get("/")
def read_root() -> Hello:
    return Hello(Greeting="Привет, мир!")


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}


@app.post("/projects/")
async def add_project(background_color: str ='white') -> dict:
    project_id = await db.create_project(background_color)
    return {"project_id": project_id}


@app.post("/elements/")
async def add_element(project_id: int, type: str, position_x: float, position_y: float, size_x: float, size_y:float, opacity: float) -> dict:
    element_id = await db.create_element(project_id, type, position_x, position_y, size_x, size_y, opacity)
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


# generate json spec file - required for client
with open('openapi.json', 'w') as f:
    json.dump(get_openapi(
        title=app.title,
        version=app.version,
        openapi_version=app.openapi_version,
        description=app.description,
        routes=app.routes,
    ), f)

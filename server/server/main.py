from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from pydantic import BaseModel
from typing import Union
import json
# from db import create_canvas

app = FastAPI(root_path="/api/")
print("Server started")

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


# @app.post("/canvas/")
# def create_canvas(background_color=None):
#     canvas_id = create_canvas(background_color)
#     return canvas_id


# generate json spec file - required for client
with open('openapi.json', 'w') as f:
    json.dump(get_openapi(
        title=app.title,
        version=app.version,
        openapi_version=app.openapi_version,
        description=app.description,
        routes=app.routes,
    ), f)

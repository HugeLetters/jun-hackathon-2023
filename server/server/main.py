from fastapi import FastAPI

app = FastAPI(root_path="/api/")


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello")
async def hello():
    return {"message": "Hello, hello"}

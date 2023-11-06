FROM python:3.10

WORKDIR /server
COPY pyproject.toml poetry.lock ./

RUN pip install poetry
RUN poetry install

COPY . . 

FROM node:21-slim AS client

COPY ./client /client
WORKDIR /client

ENV PUBLIC_IS_DOCKER=true
ENV PUBLIC_ENV=prod
RUN corepack enable    
RUN pnpm install
RUN pnpm build

FROM python:3.10 as client_server
COPY --from=client / /

COPY ./server/pyproject.toml ./server/poetry.lock ./server/
WORKDIR /server

RUN pip install poetry
RUN poetry install

COPY ./server . 

FROM nginx
COPY --from=client_server / /
COPY ./proxy/nginx.prod.conf /etc/nginx/conf.d/default.conf

WORKDIR /
COPY prod.sh .
CMD [ "bash", "prod.sh" ]

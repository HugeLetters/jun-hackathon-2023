FROM node:21-slim AS base

COPY ./ /client
WORKDIR /client

RUN corepack enable    
RUN pnpm install
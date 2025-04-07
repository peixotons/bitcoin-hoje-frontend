# Etapa 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copia arquivos de dependência e instala (npm ci é mais rápido e respeita package-lock.json)
COPY package*.json ./
RUN npm ci

# Copia o restante do código e faz o build
COPY . .
RUN npm run build

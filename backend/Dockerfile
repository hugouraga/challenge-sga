# Usar a imagem base oficial do Node.js
FROM node:21-alpine3.18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e o yarn.lock
COPY backend/package*.json ./

# Instalar as dependências do projeto
RUN yarn

# Copiar o restante do código do projeto
COPY backend . 

# Construir o projeto
RUN yarn build

# Expor a porta que o aplicativo usa
EXPOSE 3333

ENTRYPOINT ["./entrypoint.sh"]
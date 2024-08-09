# Etapa 1: Construir a aplicação
FROM node:18-alpine AS builder

# Configura o diretório de trabalho no contêiner
WORKDIR /app

# Copia o arquivo package.json e o package-lock.json (se existir)
COPY package.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto frontend para o diretório de trabalho no contêiner
COPY . .

# Compila a aplicação para produção, ignorando erros de ESLint
RUN NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_ESLINT_DIR=./ node_modules/.bin/next build

# Etapa 2: Servir a aplicação usando um servidor HTTP
FROM node:18-alpine

# Configura o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos compilados da etapa anterior para o diretório de trabalho
COPY --from=builder /app ./

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
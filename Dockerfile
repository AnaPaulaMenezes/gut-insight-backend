# Usamos uma imagem base oficial do Node (versão 18 ou a que você preferir)
FROM node:24-alpine

# Criamos o diretório de trabalho dentro do container
WORKDIR /app

# Copiamos apenas os arquivos de dependências primeiro
# Isso é um truque de performance para o build ser mais rápido
COPY package*.json ./

# Instalamos as dependências a apartir do lock file (dentro do container)
RUN npm ci

# Agora copiamos o restante do código da sua API
COPY . .

# Expomos a porta que sua API usa (geralmente 3000 ou 3333)
EXPOSE 3000

# Mudamos para um usuário não-root por segurança (opcional, mas recomendado)
USER node 

# O comando para rodar a aplicação em modo desenvolvimento
CMD ["npm", "run", "start:dev"]
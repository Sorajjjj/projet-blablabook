FROM node:20-alpine
WORKDIR /app

# On copie les fichiers de config
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

# Copie tout le contenu de ./back
COPY . .

# Compile le TypeScript (crée le dossier dist)
RUN npm run build

EXPOSE 4000

# Lance le serveur compilé
CMD ["npm", "start"]
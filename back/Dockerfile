# On passe sur Node 22 pour être tranquille avec les futures versions de Prisma
FROM node:22-alpine

# On installe seulement openssl (essentiel pour Prisma)
RUN apk add --no-cache openssl

WORKDIR /app

# On copie les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installation propre
RUN npm install
RUN npx prisma generate

# On copie le reste du code
COPY . .

# Build du projet
RUN npm run build

EXPOSE 4000

# Utilisation d'un script de démarrage qui déploie la DB avant de lancer le serveur
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
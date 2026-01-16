# BlaBlabook

## Description

BlaBlaBook est une plateforme en ligne dédiée à la gestion de bibliothèques personnelles.
L'objectif est de permettre aux utilisateurs d'organiser leurs lectures, tout en créant une communauté de passionnés de livres, favorisant la découverte et les échanges.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (version 18.x ou supérieure)
- **npm** ou **yarn**
- **PostgreSQL** (version 14.x ou supérieure)
- **Git**
- **Un éditeur de code** (VS Code recommandé)
- **Un navigateur web moderne** (Chrome, Firefox, Safari)
- **Un client PostgreSQL** (optionnel : pgAdmin, DBeaver, TablePlus)

## Structure du projet

```bash
projet-blablabook/
├── back/       # API Node.js + Express + Prisma
└── front/      
    └── next-demo/ # Application Next.js
```

## Installation

**1. Cloner le repository**

```bash
git clone [URL_DU_REPO]
cd projet-blablabook
```

**2. Configuration de PostgreSQL**

Créer l'utilisateur et la base de données PostgreSQL :
```bash
# Se connecter à PostgreSQL
psql postgres

# Dans psql, exécuter :
CREATE USER blablabook_user WITH PASSWORD 'votre_mot_de_passe';
CREATE DATABASE blablabook OWNER blablabook_user;
GRANT ALL PRIVILEGES ON DATABASE blablabook TO blablabook_user;
\q
```

**3. Configuration du Backend**

```bash
cd back
npm install
cp .env.example .env
```

Configurer les variables d'environnement dans `.env` :
- `DATABASE_URL` : `postgresql://blablabook_user:votre_mot_de_passe@localhost:5432/blablabook`
- `JWT_SECRET` : Clé secrète pour les tokens JWT (générer une chaîne aléatoire sécurisée)
- `PORT` : Port du serveur (ex: 3001)

Créer et initialiser la base de données avec Prisma :
```bash
npx prisma migrate dev
npx prisma generate
npx prisma db seed  # Optionnel : données de test
npm run dev
```

**4. Configuration du Frontend**

```bash
cd ../front/next-demo
npm install
npm run dev
```

## Ports

- Backend : http://localhost:3001
- Frontend : http://localhost:3000

## Variables d'environnement

### Backend (.env)
```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/blablabook"

# Authentification
JWT_SECRET="votre_secret_jwt_très_sécurisé"
JWT_EXPIRES_IN="7d"

# Serveur
PORT=3001
NODE_ENV="development"
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## Scripts disponibles

### Backend (depuis /back)
- `npm run dev` : Démarre le serveur en mode développement
- `npm run build` : Compile le projet TypeScript
- `npm start` : Lance le serveur en production
- `npx prisma studio` : Ouvre l'interface de gestion de la base de données

### Frontend (depuis /front/next-demo)
- `npm run dev` : Démarre l'application Next.js en développement
- `npm run build` : Compile l'application pour la production
- `npm start` : Lance l'application en production
- `npm run lint` : Vérifie la qualité du code

## Technologies

### Backend

- **TypeScript** : typage statique pour la robustesse du code
- **Node.js / Express** : API REST back-end
- **PostgreSQL** : base de données relationnelle
- **Prisma** : ORM pour la gestion des données
- **Zod** : validation des données
- **Argon2** : sécurité des mots de passe
- **JWT** (JSON Web Token) : authentification
- **Helmet.js** : sécurisation des en-têtes HTTP

### Frontend

- **HTML**
- **CSS** (ou des bibliothèques type Tailwind CSS, Bootstrap, ShadCN, ...)
- **TypeScript** : choix d'un typage statique pour la robustesse du code, ce qui nous permet de gérer les erreurs le plus tôt possible
- **Next.js** : framework front-end avec rendu SSR pour le SEO

## Fonctionnalités

#### Page d'accueil

- Présentation de BlaBlaBook
- Affichage d'une sélection de livres aléatoires

#### Système d'inscription et de connexion

- Création de compte utilisateur
- Authentification sécurisée

#### Gestion de la bibliothèque personnelle

- Ajout de livres à sa bibliothèque
- Retrait d'un livre de sa bibliothèque sans suppression de la base de données
- Gestion du statut des livres (lus / à lire)

#### Recherche et découverte de livres

- Moteur de recherche de livres
- Consultation des résultats

#### Page de détail d'un livre

## Auteurs

Projet réalisé dans le cadre de l'Apothéose - O'Clock

## Licence

[À définir]

## Support

Pour toute question ou problème, contactez l'équipe de développement.

# BlaBlabook

## Description

BlaBlaBook est une plateforme en ligne dédiée à la gestion de bibliothèques personnelles.
L’objectif est de permettre aux utilisateurs d’organiser leurs lectures, tout en créant une communauté de passionnés de livres, favorisant la découverte et les échanges.

## Structure du projet

```bash
projet-blablabook/
├── back/       # API Node.js + Express + Prisma
├── front/      
    └──next-demo/ # Application Next.js
```

## Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables dans .env
npm run dev
```

### Frontend

```bash
cd front/next-demo
npm install
npm run dev
```

## Ports

- Backend : http://localhost:portback
- Frontend : http://localhost:portfront

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


### Frontend:

- **HTML**
- **CSS** (ou des bibliothèques type Tailwind CSS, Bootstrap, ShadCN, ...)
- **TypeScript** : choix d’un typage statique pour la robustesse du code, ce qui nous permet de gérer les erreurs le plus tôt possible
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


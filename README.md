
# Stages — gestion de demandes de stages hospitaliers

Ce dépôt contient une mini-application pour gérer des demandes de stages dans différents services d'un hôpital.

Résumé technique
----------------
- Backend : Node.js, TypeScript, Express, Prisma (Postgres)
- Frontend : React, TypeScript, Vite, Ant Design
- Docs : OpenAPI/Swagger (exposées via `/api-docs`)

Prérequis
---------
- Node.js 
- npm
- Docker & Docker Compose (recommandé pour un environnement isolé)

1) Démarrage rapide (avec Docker)
---------------------------------

Construire et démarrer les services principaux (Postgres, backend, frontend) :

```bash
docker compose up --build 
```

Peupler la base avec des données de test :

- depuis le conteneur backend (si le conteneur `demandes-backend` est déjà démarré) :

```bash
docker exec -it demandes-backend node ./scripts/db-populate.js
```


Accès après démarrage :

- Frontend : http://localhost:5173
- API : http://localhost:3000
- Swagger UI : http://localhost:3000/api-docs

2) Lancer sans Docker (développement local)
-------------------------------------------

Backend

```bash
cd backend
npm install
npx prisma generate
# configurer DATABASE_URL dans .env (ex : postgres://...)
npx prisma migrate dev --name init   # initialiser la DB si nécessaire
npx prisma studio                    # inspecter la DB (optionnel)
npm run dev
```

Pour peupler la DB localement :

```bash
node ./scripts/db-populate.js
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

API principales
---------------
- GET /api/demandes — lister toutes les demandes
- POST /api/demandes — créer une demande
- GET /api/demandes/:id — détail d'une demande
- PATCH /api/demandes/:id/status — mettre à jour le statut
- GET /api/demandes/services — liste des services distincts


Choix techniques & remarques
----------------------------

## Choix techniques et remarques

### Validation des données
- **Zod** est utilisé pour la validation des données côté backend, assurant une vérification robuste et typée des entrées.

### Gestion des services
Pour éviter la création dynamique d'éléments de service (et les problèmes d'encodage/doublons associés), j'ai opté pour une **liste prédéfinie de services** sélectionnables dans le frontend.

L'alternative aurait été de créer une table `Service` dédiée avec une relation entre `Demande` et `Service`. Bien que cette approche soit préférable en production, j'ai choisi de suivre le modèle de données fourni dans l'énoncé, qui ne spécifiait pas cette table.

### Routing et navigation
- Implémentation avec **React Router** classique pour la gestion des routes de l'application.

### Filtrage des données
Le filtrage des demandes s'effectue **directement côté frontend** sans appel API supplémentaire. Ce choix est justifié par la taille réduite de l'application et le volume de données limité.

### Comportement des demandes
- Le statut par défaut d'une nouvelle demande est **`EN_ATTENTE`**.
- La liste des demandes est **triée par date de création décroissante** (les plus récentes en premier).
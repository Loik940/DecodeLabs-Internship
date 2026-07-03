# Wome Eats — API Backend (Projet 3)

API backend pour le service de livraison de repas locaux Wome Eats,
réalisée dans le cadre du stage Full Stack chez DecodeLabs.

Projet 3 fait évoluer le Projet 2 en remplaçant les données en mémoire
par une vraie base de données MongoDB, avec des schémas Mongoose pour
garantir l'intégrité des données.

## Technologies utilisées

- Node.js v24
- Express v5
- MongoDB
- Mongoose
- dotenv

## Structure des fichiers

- `server.js` — point d'entrée, démarre le serveur et branche les routes
- `config/db.js` — connexion à MongoDB via Mongoose
- `models/Plat.js` — schéma Mongoose pour les plats
- `models/Commande.js` — schéma Mongoose pour les commandes
- `routes/plats.js` — routes CRUD liées aux plats
- `routes/commandes.js` — routes liées aux commandes
- `.env` — variables d'environnement (non versionné)

## Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
PORT=3050
MONGO_URI=mongodb://localhost:27017/wome-eats
```

## Installation

```bash
npm install
```

## Démarrage

```bash
node server.js
```

Le serveur démarre par défaut sur le port 3050.

## Endpoints disponibles

### Plats

| Méthode | Route | Description |
|---|---|---|
| GET | `/plats` | Retourne tous les plats |
| GET | `/plats/:id` | Retourne un plat par son identifiant |
| POST | `/plats` | Crée un nouveau plat |
| PUT | `/plats/:id` | Modifie un plat existant |
| DELETE | `/plats/:id` | Désactive un plat (soft delete — le plat reste en base pour préserver l'historique des commandes) |

Le champ `nom` doit être unique : toute tentative de création ou de
modification avec un nom déjà utilisé par un autre plat renvoie `400`.

### Commandes

| Méthode | Route | Description |
|---|---|---|
| GET | `/commandes` | Retourne toutes les commandes |
| GET | `/commandes/:id` | Retourne une commande par son identifiant |
| POST | `/commandes` | Crée une nouvelle commande |
| PUT | `/commandes/:id/statut` | Met à jour le statut d'une commande |

Chaque `platId` fourni dans `lignes` doit correspondre à un plat existant
et disponible. Dans le cas contraire, la commande n'est pas créée :
`404` si le plat n'existe pas, `400` s'il existe mais est indisponible.

## Exemple de création de plat

Requête POST vers `/plats` :

```json
{
  "nom": "Amiwo",
  "description": "Plat traditionnel béninois",
  "prix": 1500,
  "disponible": true
}
```

## Exemple de création de commande

Requête POST vers `/commandes` :

```json
{
  "client": "Koffi Mensah",
  "adresse": "Cotonou, Akpakpa",
  "lignes": [
    {
      "platId": "6a47f727cbe171e5967ac2fb",
      "quantite": 2
    },
    {
      "platId": "6a47f7b1cbe171e5967ac2fc",
      "quantite": 3
    }
  ]
}
```

## Exemple de mise à jour de statut

Requête PUT vers `/commandes/:id/statut` :

```json
{
  "statut": "confirmée"
}
```

Valeurs acceptées : `en attente`, `confirmée`, `livrée`, `annulée`

## Codes HTTP utilisés

| Code | Signification |
|---|---|
| 200 | Requête réussie |
| 201 | Ressource créée avec succès |
| 400 | Données invalides envoyées par le client |
| 404 | Ressource introuvable |
| 500 | Erreur interne du serveur |
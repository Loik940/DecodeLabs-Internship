# Wome Eats — API Backend (Projet 2)

API backend pour le service de livraison de repas locaux Wome Eats,
réalisée dans le cadre du stage Full Stack chez DecodeLabs.

## Technologies utilisées

- Node.js v24
- Express v5
- dotenv

## Structure des fichiers

- `server.js` — point d'entrée, démarre le serveur et branche les routes
- `routes/plats.js` — routes liées à la consultation des plats
- `routes/commandes.js` — routes liées à la consultation et à la création des commandes
- `data/plats.json` — données des plats disponibles
- `.env` — variables d'environnement (non versionné)

## Installation

```bash
npm install
```

## Démarrage

```bash
node server.js
```

Le serveur démarre par défaut sur le port 3050, ou sur le port défini dans la variable d’environnement `PORT`.

## Endpoints disponibles

| Méthode | Route | Description |
|---|---|---|
| GET | `/plats` | Retourne tous les plats |
| GET | `/plats/:id` | Retourne un plat par son identifiant |
| GET | `/commandes` | Retourne toutes les commandes |
| POST | `/commandes` | Crée une nouvelle commande |
| GET | `/plats/commandes` | Alias de la route `/commandes` |
| POST | `/plats/commandes` | Alias de la route `/commandes` |

## Exemple de commande

Requête POST vers `/commandes` (ou `/plats/commandes`) :

```json
{
  "client": "Oswald",
  "platId": 1,
  "quantite": 2,
  "adresse": "Cotonou, Cadjehoun"
}
```

Réponse attendue :

```json
{
  "message": "Commande créée avec succès",
  "commande": {
    "id": 1,
    "platId": 1,
    "quantite": 2,
    "adresse": "Cotonou, Cadjehoun",
    "prix": 3000,
    "statut": "confirmée"
  }
}
```

## Codes HTTP utilisés

| Code | Signification |
|---|---|
| 200 | Requête réussie |
| 201 | Ressource créée avec succès |
| 400 | Données invalides envoyées par le client |
| 404 | Ressource introuvable |

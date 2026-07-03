require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 3050;
app.use(express.json());


// Connexion MongoDB
connectDB();

app.use(express.json());

// Brancher les routes
const platsRouter = require('./routes/plats');
const commandesRouter = require('./routes/commandes');

app.use('/plats', platsRouter);
app.use('/commandes', commandesRouter);
app.use('/plats/commandes', commandesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur Wome Eats' });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Erreur interne du serveur',
        erreur: err.message
    });
});

// Route non trouvée (404 global)
app.use((req, res) => {
    res.status(404).json({ message: 'Route introuvable' });
});

app.listen(port, () => {
  console.log(`Le Serveur est en cours d'exécution sur http://localhost:${port}`);
});
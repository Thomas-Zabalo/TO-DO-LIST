const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const taskRoutes = require('../routes/tasks');

const app = express();
const port = 3000;
main().catch(err => console.log(err))

async function main() {
    // Connexion à MongoDB
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Connecté à MongoDB'))
        .catch(error => {
            console.error('Erreur de connexion à MongoDB :', error.message);
            process.exit(1); // Quitter l'application en cas d'erreur de connexion
        });

    // Utilisation des routes pour les tâches
    app.use('/api', taskRoutes);

    // Démarrer le serveur
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}


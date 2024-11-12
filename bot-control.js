import express from 'express';
import Cors from 'cors';

const app = express();
app.use(Cors());
app.use(express.json());

// Importez votre bot Discord depuis le fichier principal (par exemple `bot.js`)
let bot;

// Démarrer le bot Discord si ce n'est pas déjà fait
if (!bot) {
  bot = require('../../../path/to/your/bot.js');
}

// Une clé API pour sécuriser l'accès au tableau de bord
const API_KEY = process.env.API_KEY;

app.post('/api/bot-control', (req, res) => {
  const { command, apiKey } = req.body;
  
  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Clé API invalide' });
  }

  if (command === 'start') {
    // Ajouter une commande pour démarrer le bot
    bot.login(process.env.TOKEN);
    res.json({ message: 'Bot démarré avec succès' });
  } else if (command === 'stop') {
    // Arrête le bot
    bot.destroy();
    res.json({ message: 'Bot arrêté avec succès' });
  } else {
    res.status(400).json({ error: 'Commande inconnue' });
  }
});

export default app;

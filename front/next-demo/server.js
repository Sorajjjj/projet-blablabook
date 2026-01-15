const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Absolute path to your HTML file
const htmlFilePath = path.join(__dirname, 'Integration', 'Bibliotheque.html');
const accueilFilePath = path.join(__dirname, 'Integration', 'Accueil.html');

app.get('/Accueil', (req, res) => {
  res.sendFile(accueilFilePath, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });
});

// Optional: serve static files (CSS, JS, images) from the same folder
app.use('/Integration', express.static(path.join(__dirname, 'Integration')));

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

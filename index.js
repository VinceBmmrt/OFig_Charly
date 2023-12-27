// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');

const session = require('express-session')

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;


const app = express();

// configuration EJS
app.set("view engine", "ejs")
app.set("views", "./app/views")

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

// config de la session
app.use(session({
  secret: "Mon secret !",
  saveUninitialized: true,
  resave: true, // permet de sauvegarder automatiqmeent les changements de la session à chaque fin de requête
  cookie: {
    // on passe secure à false car sinon le cookie ne sera pas envoyé car on n'est pas en HTTPS
    secure: false,
    maxAge: (60 * 60 * 1000)
  }
}))

// initialisation de la session
app.use((req, res, next) => {
  if (!req.session.favoris) {
    req.session.favoris = []
  }
  // à partir d'ici, à chaque requête on aura accès à req.session.favoris
  next()
})

// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

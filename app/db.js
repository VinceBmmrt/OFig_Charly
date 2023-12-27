const { Client } = require('pg')

const db = new Client(process.env.PG_URL)

db.connect().then(console.log("💾 Connecté à la db !")).catch((err) => console.log(err))

module.exports = db;
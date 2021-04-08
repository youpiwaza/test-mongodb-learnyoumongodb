//// Imports
const 
    assert       = require('assert')
    ,format      = require('util').format
    ,MongoClient = require('mongodb').MongoClient
;

//// Constantes
const 
    databaseName  = 'learnmymongodb'
    ,url          = 'mongodb://localhost:27017'
;

//// Création du client et connexion :)
const client      = new MongoClient(url, { useUnifiedTopology: true })

client.connect(function(err) {
    assert.strictEqual(null, err);
    const db = client.db(databaseName);

    // console.log(`On est bieng connectés !`)
    client.close();
});

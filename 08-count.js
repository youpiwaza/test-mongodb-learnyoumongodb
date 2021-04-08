//// Imports
const 
    assert       = require('assert')
    ,format      = require('util').format
    ,MongoClient = require('mongodb').MongoClient
;

//// Constantes
const 
    // databaseName  = 'admin' // test
    databaseName  = 'learnyoumongo'
    // databaseName  = process.argv[2]
    ,url          = 'mongodb://localhost:27017'
;

//// Variables de l'exo
// console.log(process.argv);
const
    // collectionName              = process.argv[3]
    collectionName              = 'parrots'
    ,ageMiniDuPerokEnIntPutain  = parseInt(process.argv[2]);
;


//// Création du client et connexion :)
const client      = new MongoClient(url, { useUnifiedTopology: true })

client.connect(function(err) {
    // console.log(err)
    assert.strictEqual(null, err);
    const db            = client.db(databaseName);
    const collection    = db.collection(collectionName)

    // cf. ./03-find.js
    //// COMPTER compté
    //  http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#countDocuments
    //  blah² exemples : https://docs.mongodb.com/manual/reference/method/db.collection.countDocuments/
    //  countDocuments(query, options, callback){
    collection.countDocuments(
        // query
        { 
            age: { $gt: ageMiniDuPerokEnIntPutain } // OK
        },
        // options
        {}
        // callback
        ,function(err, documents) {
            // console.log(err)
            assert.strictEqual(null, err);
            // console.log(`On a bieng recup`, documents)
            console.log(documents)
            client.close();
        }
    )
});


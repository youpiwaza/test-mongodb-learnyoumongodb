//// Imports
const 
    assert       = require('assert')
    ,format      = require('util').format
    ,MongoClient = require('mongodb').MongoClient
;

//// Constantes
const 
    // databaseName  = 'admin' // test
    // databaseName  = 'learnyoumongo'
    databaseName  = process.argv[2]
    ,url          = 'mongodb://localhost:27017'
;

//// Variables de l'exo
console.log(process.argv);
const
    collectionName              = process.argv[3]
    ,lIdDuDocumentASupprimer    = process.argv[4]
;


//// Création du client et connexion :)
const client      = new MongoClient(url, { useUnifiedTopology: true })

client.connect(function(err) {
    // console.log(err)
    assert.strictEqual(null, err);
    const db            = client.db(databaseName);
    const collection    = db.collection(collectionName)
    
    //// Faire une modification
    //      http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne
    //      doc mongo, pas la bonne syntaxe mais bons exemples : 
    //          https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/
    //      deletes the first document that matches the filter.
    //  deleteOne(filter, options, callback)
    collection.deleteOne(
        // filter
        //      For the purpose of this lesson, assume that the username property is unique.
        {
            _id: lIdDuDocumentASupprimer
        }
        // ,options
        ,{}
        // ,callback
        ,function(err, data) {
            // handle error
            assert.strictEqual(null, err);
            
            // other operations
            console.log(`Woputaing ca marche`)

            console.log(JSON.stringify(data))
            
            client.close();
        }
    )
});


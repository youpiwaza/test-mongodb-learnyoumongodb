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



//// Création du client et connexion :)
const client      = new MongoClient(url, { useUnifiedTopology: true })

client.connect(function(err) {
    // console.log(err)
    assert.strictEqual(null, err);
    const db            = client.db(databaseName);
    // const collection    = db.collection('users') // test
    const collection    = db.collection('users')
    
    //// Faire une modification
    //      http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne
    //  updateOne(filter, update, options, callback)
    collection.updateOne(
        // filter
        //      For the purpose of this lesson, assume that the username property is unique.
        {
            username: "tinatime"
        }
        // ,update
        ,{
            // Pay close attention to the $set property.
            //  If we were to omit $set, the document would be replaced
            //  with the object represented by the second argument.

            // Si tu utilises $set, tu remplaces uniquement ce que
            //  tu veux dans l'objet existant, sinon, tu remplaces tout
            $set: {
                age: 40
            }
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

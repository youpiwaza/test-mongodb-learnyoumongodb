//// Imports
const 
    assert       = require('assert')
    ,format      = require('util').format
    ,MongoClient = require('mongodb').MongoClient
;

//// Constantes
const 
    databaseName  = 'learnyoumongo'
    ,url          = 'mongodb://localhost:27017'
;

//// Variables de l'exo
// console.log(process.argv);
const ageMiniDuPerok = process.argv[2];
// console.log(typeof ageMiniDuPerok);
const ageMiniDuPerokEnIntPutain = parseInt(process.argv[2]);
// console.log(typeof ageMiniDuPerokEnIntPutain);

//// Création du client et connexion :)
const client      = new MongoClient(url, { useUnifiedTopology: true })

client.connect(function(err) {
    // console.log(err)
    assert.strictEqual(null, err);
    const db            = client.db(databaseName);
    const collection    = db.collection('parrots')
    
    // console.log(`On est bieng connectés !`)
    // console.log(ageMiniDuPerok)
    
    // // Pour le test on récupère tout
    // collection.find({})
    // Récupérer les perok dont l'age est PLUS GRAND que
    //      https://docs.mongodb.com/manual/reference/operator/query/gt/#mongodb-query-op.-gt
    //      gt ~= greater than
    collection.find(
        { 
            // age: { $gt: 3 }
            // age: { $gt: ageMiniDuPerok } // KO
            // age: { $gt: "3" } // KO
            age: { $gt: ageMiniDuPerokEnIntPutain } // OK
            // age: { $gt: +ageMiniDuPerok } // -3 >> forcer un nb positif ils rajoutent un +3
        }
    )
        .toArray(function(err, documents) {
        // console.log(err)
        assert.strictEqual(null, err);
        // console.log(`On a bieng recup`, documents)
        console.log(documents)
        client.close();
    })

});

//// Imports
const 
    assert       = require('assert')
    ,format      = require('util').format
    ,MongoClient = require('mongodb').MongoClient
;

//// Constantes
const 
    databaseName  = 'admin' // test
    // databaseName  = 'learnyoumongo'
    ,url          = 'mongodb://localhost:27017'
;

//// Variables de l'exo
// console.log(process.argv);
const firstName = process.argv[2];
const lastName  = process.argv[3];

// console.log(firstName, lastName);

// Préparation de l'objet à envoyer
const objetAEnvoyer = { 
    firstName
    ,lastName
}



//// Création du client et connexion :)
const client      = new MongoClient(url, { useUnifiedTopology: true })

client.connect(function(err) {
    // console.log(err)
    assert.strictEqual(null, err);
    const db            = client.db(databaseName);
    const collection    = db.collection('users') // test
    // const collection    = db.collection('docs')
    
    //// Faire une insertion
    // http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insert
    
    // collection.insert({ // 🚨 DEPRECATED

    //// Test d'ajout multiples
    //          http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany
    collection.insertMany(
        // 1er paramètre : un TABLEAU ! d'objets à ajouter
        [
            { name: "Une test d'ajout multiples" }
            ,{ name: "Une test d'ajout multiples 2" }
            ,{ name: "Une test d'ajout multiples 3" }
            ,{ name: "Une test d'ajout multiples 4" }
        ],

        // 2eme paramètre : les options
        {},

        // 3eme paramètre : Callback
        function(err, data) {
            // handle error
            assert.strictEqual(null, err);
            
            // other operations
            console.log(`Woputaing ca marche insertMany`)

            //// Possibilité d'avoir accès a des infos du serveur
            //      une fois l'ajout effectué
            console.log(JSON.stringify(data)) // v
            // {
            //     "result":
            //         {"ok":1,"n":4},
            //         "ops":[
            //             {"name":"Une test d'ajout multiples","_id":"606f032548b8202ad83e903e"},
            //             {"name":"Une test d'ajout multiples 2","_id":"606f032548b8202ad83e903f"},
            //             {"name":"Une test d'ajout multiples 3","_id":"606f032548b8202ad83e9040"},
            //             {"name":"Une test d'ajout multiples 4","_id":"606f032548b8202ad83e9041"}
            //         ],
            //         "insertedCount":4,
            //         "insertedIds":{   
            //                 "0":"606f032548b8202ad83e903e",
            //                 "1":"606f032548b8202ad83e903f",
            //                 "2":"606f032548b8202ad83e9040",
            //                 "3":"606f032548b8202ad83e9041"
            //         }
            // }
            
            client.close();
        }
    )
});

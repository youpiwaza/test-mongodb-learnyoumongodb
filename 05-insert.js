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
    // const collection    = db.collection('users') // test
    const collection    = db.collection('docs')
    
    //// Faire une insertion
    // http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insert
    
    // collection.insert({ // 🚨 DEPRECATED
    
    // 🚨 ATTENTION / Les paramètres diffèrent de mongodb classique
    // 🚨             Le callback n'est pas en 2eme position, mais en 3eme
    collection.insertOne(
        // 1er paramètre : l'objet/le document à rajouter
        // TEST
        // { 
        //     mon_super_test: "Waow"
        //     ,age: 12
        //     ,nom: "encore Waow"
        // },
        // { 
        //     firstName
        //     ,lastName
        // },
        objetAEnvoyer,

        // 2eme paramètre : les options
        {},

        // 3eme paramètre : Callback
        function(err, data) {
            // handle error
            assert.strictEqual(null, err);
            
            // other operations
            // console.log(`Woputaing ca marche`)

            //// Afficher l'objet sans aucune raison (pour l'exo laul)
            ///////// ATTENTION A BIEN CONVERTIR EN JSON
            //  JSON.stringify !!!!!!! 🤡
            console.log(JSON.stringify(objetAEnvoyer))

            //// Possibilité d'avoir accès a des infos du serveur
            //      une fois l'ajout effectué
            // console.log(JSON.stringify(data))
            //  Possibilité de récupérer l'id de l'élément ajouté :D
            // console.log(JSON.stringify(data.insertedId))
            // console.log(JSON.stringify(data.ops))
            // console.log(JSON.stringify(data.ops[0]))
            
            client.close();
        }
    )
});

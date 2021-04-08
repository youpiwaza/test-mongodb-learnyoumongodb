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
            age: { $gt: ageMiniDuPerokEnIntPutain }
        },
        // options
        {   
            //// ~Vraiment la même chose qu'en SQL > au lieu de faire SELECT *
            ////      On fait SELECT nom, prenom, pour n'afficher que certaines colonnes


            
            // Sans projection : 
            //       { _id: 606efa06544bf32020ba7f1a, name: 'Fred', age: 1 }
            
            //// 1 > Forcer l'affichage de certains champs
            // """Uniquement""" le nom 
            //  { _id: 606efa5fa05f0f3db486b00f, name: 'Fred' },
            // projection: {'name': 1 }

            // """Uniquement""" l'age et le nom 
            //  { _id: 606efa9953d8562994e87f37, name: 'Fred', age: 1 }
            // projection: { 'age': 1, 'name': 1 }

            // ^ l'id est toujours affiché par défaut
            // Même si le fait d'utiliser 1 sur un ou plusieurs champs masque les autre

            //// Exclure des champs/colonnes
            // Passer le champ à 0
            // projection: { 'name': 0 }

            projection: {
                '_id': 0    //  On masque l'_id
                ,'age': 1   // On affiche l'age'
                ,'name': 1  // On affiche le nom
            }
            
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

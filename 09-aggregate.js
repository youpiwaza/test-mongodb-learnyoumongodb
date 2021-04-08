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
    collectionName              = 'prices'
    ,tailleDesTShirtDontOnVeutLaMoyenneDesPrix  = process.argv[2];
;


//// Création du client et connexion :)
const client      = new MongoClient(url, { useUnifiedTopology: true })

client.connect(function(err) {
    // console.log(err)
    assert.strictEqual(null, err);
    const db            = client.db(databaseName);
    const collection    = db.collection(collectionName)

    // Aggrégation
    //      http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate
    //      aggregate(pipeline, options, callback)
    
    // Exemple concret : https://docs.mongodb.com/manual/aggregation/
    
    // console.log('Pensez a vérifier ;)', tailleDesTShirtDontOnVeutLaMoyenneDesPrix);
    const cursor = collection.aggregate(
        // pipeline 
        [
            // { $match: { size: 'L' } }
            {
                // $match > mot clé
                $match: {
                    // $size > La référence à la propriété concernée de l'objet de la BDD
                    // {
                        //     "name": "Tshirt",
                        //     "size": "S",
                        //      ^^ ICIIIIIIIIIIIIIIIII
                        //     "price": 10,
                        //          ^ LUI
                        //     "quantity": 12
                        //     "meta": {
                        //     "vendor": "hanes",
                        //     "location": "US"
                        //     }
                        // }
                    // L'autre c'est une valeur
                    /// Grosso merdo un tri, l'équivalent de filter dans les autres exemples
                    size: tailleDesTShirtDontOnVeutLaMoyenneDesPrix
                }
            }
            ,{
                // $group > mot clé
                $group:
                {
                    // On définit un nom pour la colonne>propriété de l'objet résultat
                    // ON LE REUTILISE A LA LIGNE DU DESSOUS
                    _id: 'average',
                    // ON LE REUTILISE ICI
                    average: { 
                        // $avg > mot clé / $addToSet, $avg, $first, $last, $max, $min, $push, $sum
                        // $price > La référence à la propriété concernée de l'objet de la BDD
                        // {
                        //     "name": "Tshirt",
                        //     "size": "S",
                        //     "price": 10,
                        //          ^ LUI ICIIIIIIIIIIIIIIIIIII
                        //     "quantity": 12
                        //     "meta": {
                        //     "vendor": "hanes",
                        //     "location": "US"
                        //     }
                        // }
                        $avg: '$price'
                    }
                }
            }
        ] 
        // ,options 
        ,{} 
        // ,callback
        //              http://mongodb.github.io/node-mongodb-native/3.6/api/AggregationCursor.html
        ,function(err, leCursorQuiFaitPeur) {
            // console.log(err)
            assert.strictEqual(null, err)
            // console.log(`On a bieng recup`, documents)
            // console.log(leCursorQuiFaitPeur)
            //      https://mongodb.github.io/node-mongodb-native/2.2/api/AggregationCursor.html#each
            //      ^ LE PUTAIN DE LIEN VERS L'EXEMPLE DE CURSEUR QUI MARCHE récupérer curseur résultats curseur cursor aggreg de merde bizoux moi du futur ;)
            leCursorQuiFaitPeur.each(function(err, docs) {
                assert.strictEqual(null, err)
                // console.log(`On a bieng recup`, documents)
                // console.log(docs)
                
                const resulat = docs;
                // console.log(docs) // { _id: 'average', average: 16.5 }
                
                const moyenne = Number(resulat.average);
                // console.log(moyenne) // 15, booh
                
                const moyenneAvecChiffresDerreiereLaVirgule = moyenne.toFixed(2);
                console.log(moyenneAvecChiffresDerreiereLaVirgule) // '15.00' > yay

                
                // console.log(docs.average) // 15, booh
                // console.log(Number(docs.average).toFixed(2)) // '15.00' > yay

                // client.close(); // rajoute un null dans la console et fait planter ?
            })
        }
    )
});


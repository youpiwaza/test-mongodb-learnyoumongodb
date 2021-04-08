# Apprentissage de mongodb : learnyoumongodb

La suite de petits tutos sur [LE VRAI](https://github.com/evanlucas/learnyoumongo) ~~[mongodbay](https://www.npmjs.com/package/learnyoumongodb)~~.

## How to / Comment ksa marche ?

```bash
# Installation du tutoriel
# (voir l'install) / NONhttps://www.npmjs.com/packNONage/learnyoumongodb

# Installatin des packages
npm i
# Pour tester en local
node 01-program.js

## Pour executer les commandes du tutoriel
# Enoncé & choix de l'exercice
learnyoumongodb
# Tester que le setup est bon
##  SI KO > Ajouter mongoDb au PATH
learnyoumongodb verify

# Lancer le serveur 
## ATTEN PUTAIN DE TION
## EXECUTER DANS UN TERMINAL A COTE ET LAISSER TOURNER yay fun
mongod --port 27017 --dbpath=./data
```

## Notes

- Les énoncés en propre en .md sont [dans le repo](https://github.com/evanlucas/learnyoumongo/blob/master/exercises/find/problem.md).
  - Surtout si il y a des problèmes d'affichage des traductions
- Pour `01-program.js` > La connexion à été optimisée :)
- La vraie doc : [doc](http://mongodb.github.io/node-mongodb-native/3.6/api/)

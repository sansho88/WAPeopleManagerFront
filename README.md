# WAPeopleManager

WAPeopleManager est une application Angular permettant de gérer des personnes et leurs emplois. Elle inclut des fonctionnalités pour ajouter, modifier, supprimer et consulter des personnes ainsi que leurs emplois associés.

## Fonctionnalités principales

- **Gestion des personnes** : Ajout, modification, suppression et consultation des informations personnelles.
- **Gestion des emplois** : Ajout, suppression et consultation des emplois associés à une personne.
- **Recherche avancée** :
  - Recherche de personnes par nom d'entreprise. (WIP)
  - Filtrage des emplois par plage de dates. (WIP)
- **Tri et validation** :
  - Tri alphabétique des personnes.
  - Validation de l'âge maximum autorisé pour une personne.

## Modèles utilisés

### People
Représente une personne avec les propriétés suivantes :
- `id` : Identifiant unique.
- `firstName` : Prénom.
- `lastName` : Nom de famille.
- `birthday` : Date de naissance.
- `jobs` : Liste des emplois associés.

### Job
Représente un emploi avec les propriétés suivantes :
- `title` : Titre du poste.
- `companyName` : Nom de l'entreprise.
- `startDate` : Date de début.
- `endDate` : Date de fin (facultative).

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   cd WAPeopleManager
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```
## Construction

Pour construire le projet, exécutez :

```bash
ng build
```

## Serveur de développement

Pour démarrer un serveur de développement local, exécutez :

```bash
ng serve
```


Les artefacts de construction seront stockés dans le répertoire `dist/`. Par défaut, la construction en mode production optimise l'application pour les performances.


## API utilisée

L'application communique avec une API REST située à l'adresse suivante : `https://localhost:7033/api/People`. Les services Angular gèrent les appels pour récupérer, créer, mettre à jour et supprimer des données.


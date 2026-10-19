# Moodly — Moodboard d'inspirations visuelles

## Présentation du projet

**Moodly** est une application web permettant de créer et de gérer une collection personnelle d'inspirations visuelles. Elle s'adresse notamment aux personnes créatives qui souhaitent rassembler leurs références graphiques et les organiser par catégories.

Ce projet est réalisé dans le cadre de l'atelier de développement web en **BUT 3 MMI**, avec le framework AdonisJS.

## Fonctionnalités

- **Créer** une référence visuelle avec un titre, une catégorie, une URL d'image, une source et des notes.
- **Consulter** les références enregistrées dans une interface web.
- **Modifier** les informations d'une référence existante.
- **Supprimer** une référence.
- **Valider les données** envoyées au backend avec VineJS.

Les filtres par catégorie et les améliorations de l'affichage des images sont des évolutions prévues pour rendre l'application plus visuelle et pratique.

## Technologies utilisées

### Backend
- [AdonisJS](https://docs.adonisjs.com/) — framework backend.
- [Lucid ORM](https://lucid.adonisjs.com/docs/introduction) — gestion des données et interactions avec la base de données.
- [VineJS](https://vinejs.dev/docs/introduction) — validation des données.
- SQLite — base de données relationnelle.

### Frontend
- React — création de l'interface utilisateur.
- Vite — environnement de développement frontend.
- CSS — mise en forme de l'interface.

## Structure du projet

Le projet est organisé en deux parties :

- `moodly-api/` : backend AdonisJS, routes, contrôleurs, modèles, validateurs et migrations.
- `moodly-front/` : interface React, composants et styles CSS.

## Installation et lancement

### Prérequis

- Node.js et npm.
- Git.

### 1. Récupérer le projet

```bash
git clone URL_DU_DEPOT
cd NOM_DU_DEPOT
```

Remplacez `URL_DU_DEPOT` et `NOM_DU_DEPOT` par l'adresse et le nom réels de votre dépôt GitHub.

### 2. Lancer le backend

```bash
cd moodly-api
npm install
```

Configurez le fichier `.env` à partir du fichier d'exemple fourni par le projet, si nécessaire. Vérifiez notamment la configuration de la base de données.

Lancez ensuite les migrations si elles ne sont pas déjà appliquées :

```bash
node ace migration:run
```

Démarrez le serveur de développement :

```bash
npm run dev
```

Le backend est généralement accessible à l'adresse `http://localhost:3333`, selon sa configuration.

### 3. Lancer le frontend

Dans un second terminal :

```bash
cd moodly-front
npm install
npm run dev
```

Ouvrez dans votre navigateur l'adresse locale indiquée par Vite dans le terminal.

## Utilisation

1. Ouvrir Moodly dans le navigateur.
2. Ajouter une référence en renseignant son titre et sa catégorie.
3. Compléter éventuellement l'URL de l'image, la source et les notes.
4. Consulter les références enregistrées.
5. Modifier ou supprimer une référence selon les besoins.

## Utilisation de l'intelligence artificielle

L'intelligence artificielle a été utilisée comme outil d'accompagnement pendant le développement.

Elle a notamment permis de :
- Comprendre et mettre en place certaines parties du backend AdonisJS.
- Être accompagné dans la création des routes, des contrôleurs et de la validation des données.
- Développer les formulaires et leur communication avec l'API.
- Comprendre les erreurs rencontrées et rechercher des solutions.
- Structurer la documentation du projet.

L'utilisation de l'IA nécessite de vérifier les propositions, de tester le code et de comprendre le fonctionnement des fonctionnalités intégrées. Les erreurs rencontrées au cours du développement ont servi à mieux comprendre les échanges entre le frontend, le backend et la base de données.

## Difficultés et apprentissages

Ce projet permet de mettre en pratique la création d'une application web complète, avec un frontend distinct du backend.

Les principaux apprentissages concernent :
- La création et l'utilisation d'une API.
- La gestion des données avec Lucid ORM et SQLite.
- La mise en place des opérations CRUD.
- La validation des données avec VineJS.
- La communication entre React et AdonisJS.
- Le débogage et l'organisation du code.

## Contexte pédagogique

Projet réalisé dans le cadre de l'atelier de développement web **BUT 3 MMI — AdonisJS**.

L'objectif est de concevoir une application fonctionnelle, de comprendre son architecture technique et d'expérimenter l'utilisation de l'intelligence artificielle dans un processus de développement web.
# Moodly — Moodboard d'inspirations visuelles

## Présentation du projet

**Moodly** est une application web permettant de créer et de gérer une collection personnelle d'inspirations visuelles. Elle s'adresse notamment aux personnes créatives qui souhaitent rassembler leurs références graphiques et les organiser par catégories.

Ce projet est réalisé dans le cadre de l'atelier de développement web en **BUT 3 MMI**, avec le framework AdonisJS.

## Fonctionnalités

- **Créer** une référence visuelle avec un titre, une catégorie, une image, une source et des notes.
- **Consulter** les références enregistrées dans une interface web.
- **Modifier** les informations d'une référence existante.
- **Supprimer** une référence.
- **Rechercher** une référence à partir de son titre.
- **Filtrer** les références par catégorie.
- **Consulter une fiche détail** pour afficher les informations d'une référence.

## Technologies utilisées

### Backend
- AdonisJS — framework backend.
- Lucid ORM — gestion des données et interactions avec la base de données.
- VineJS — validation des données.
- SQLite — base de données relationnelle.

### Frontend
- React — création de l'interface utilisateur.
- Vite — environnement de développement frontend.
- CSS — mise en forme de l'interface.

## Architecture du projet

Le projet est organisé en deux parties :

- moodly-api/ : backend AdonisJS, routes, contrôleurs, modèles, validateurs et migrations.
- moodly-front/ : interface React, composants et styles CSS.


### Base de données

Les références visuelles sont stockées dans une table appelée `visual_references`.

Cette table contient les informations nécessaires à la gestion des références, notamment leur titre, leur catégorie, le chemin de leur image, leur source éventuelle et leurs notes.


## Utilisation de l'intelligence artificielle

L'intelligence artificielle a été utilisée comme outil d'accompagnement pendant le développement.

Elle a notamment permis de :

- Comprendre et mettre en place certaines parties du backend AdonisJS.
- Être accompagné dans la création des routes, des contrôleurs et de la validation des données.
- Développer les formulaires et leur communication avec l'API.
- Comprendre les erreurs rencontrées et rechercher des solutions.
- Structurer la documentation du projet.

## Difficultés et apprentissages

Ce projet m'a permis de mettre en pratique la création d'une application web complète, avec un frontend distinct du backend.

Les principaux apprentissages concernent :

- La création et l'utilisation d'une API.
- La gestion des données avec Lucid ORM et SQLite.
- La mise en place des opérations CRUD.
- La validation des données avec VineJS.
- La communication entre React et AdonisJS.

## Installation et lancement

### Prérequis

- Node.js et npm installés.
- Git, si le projet est récupéré depuis un dépôt distant.

### 1. Lancer le backend

Depuis un terminal :

```bash
cd moodly-api
npm install
```

Configurer les variables d'environnement nécessaires, puis créer ou mettre à jour la base de données avec les commandes de migration adaptées au projet.

Lancer ensuite le serveur :

```bash
node ace serve --watch
```

### 2. Lancer le frontend

Dans un second terminal :

```bash
cd moodly-front
npm install
npm run dev
```

Ouvrir ensuite dans le navigateur l'adresse locale indiquée par Vite.

## Contexte pédagogique

Projet réalisé dans le cadre de l'atelier de développement web **BUT 3 MMI — AdonisJS**.

L'objectif est de concevoir une application fonctionnelle, de comprendre son architecture technique et d'expérimenter l'utilisation de l'intelligence artificielle dans un processus de développement web.
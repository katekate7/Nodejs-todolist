# Guide de Déploiement - Todo Backend API

Ce document explique comment déployer l'application Todo Backend en utilisant Docker et Docker Compose.

## Prérequis

- [Docker](https://docs.docker.com/get-docker/) (version 19.03.0+)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.27.0+)

## Structure du Déploiement

L'application est conteneurisée avec Docker et utilise les composants suivants:

- **API Node.js**: Service principal exécutant l'application Express.js
- **MongoDB**: Base de données pour stocker les utilisateurs et les tâches
- **Réseau Docker**: Communication entre les services
- **Volumes Docker**: Persistance des données MongoDB

## Configuration

### Variables d'Environnement

Les variables d'environnement sont configurées dans le fichier `docker-compose.yml`. Vous pouvez les personnaliser en créant un fichier `.env` à la racine du projet avec les valeurs suivantes:

```
APP_PORT=3000
MONGO_URL=mongodb://mongodb:27017/todo-app
SECRET_TOKEN=votre_token_secret_très_sécurisé
```

> **Important**: Pour la production, remplacez `votre_token_secret_très_sécurisé` par une chaîne aléatoire et sécurisée.

## Déploiement

### Déploiement Local

Pour déployer l'application localement:

1. Clonez le repository (si ce n'est pas déjà fait)
   ```bash
   git clone https://github.com/katekate7/Nodejs-todolist.git
   cd nodejs-todo-backend
   ```

2. Créez un fichier `.env` avec vos variables d'environnement ou utilisez les valeurs par défaut

3. Démarrez les services avec Docker Compose
   ```bash
   docker-compose up -d
   ```

4. L'API sera accessible à `http://localhost:3000`

### Vérification du Déploiement

Pour vérifier que l'application fonctionne correctement:

```bash
# Vérifier que les conteneurs sont en cours d'exécution
docker-compose ps

# Consulter les logs de l'API
docker-compose logs -f api

# Tester l'API avec curl
curl http://localhost:3000/
```

Vous devriez voir un message de réponse: `{"message":"Server active."}`

## Gestion des Conteneurs

### Arrêter les Services

```bash
docker-compose down
```

### Arrêter les Services et Supprimer les Volumes

```bash
docker-compose down -v
```

### Redémarrer les Services

```bash
docker-compose restart
```

### Mettre à Jour l'Application

Si vous modifiez le code source:

```bash
docker-compose build api
docker-compose up -d api
```

## Sécurité

Pour renforcer la sécurité en production:

1. Utilisez un `SECRET_TOKEN` fort et aléatoire
2. Limitez l'accès aux ports de MongoDB (ne l'exposez pas publiquement)
3. Mettez en place HTTPS devant votre API
4. Configurez des limites de taux (rate limiting) pour prévenir les abus

## Sauvegarde des Données

Les données MongoDB sont persistantes grâce au volume `mongodb_data`. Pour sauvegarder les données:

```bash
# Créer un backup
docker exec mongodb mongodump --out /data/db/backup

# Copier le backup sur la machine hôte
docker cp mongodb:/data/db/backup ./backup
```

## Dépannage

### L'API ne peut pas se connecter à MongoDB

Vérifiez que MongoDB est en cours d'exécution:
```bash
docker-compose ps mongodb
```

Vérifiez les logs de l'API:
```bash
docker-compose logs api
```

### Problème de Persistance des Données

Vérifiez que le volume est correctement créé:
```bash
docker volume ls | grep mongodb_data
```

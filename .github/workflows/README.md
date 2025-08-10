# CI/CD GitHub Actions

Ce répertoire contient les workflows GitHub Actions pour l'automatisation du CI/CD de l'application Todo Backend.

## Workflows disponibles

### 1. Node.js CI (`node-ci.yml`)

**Fonction**: Exécution des tests et vérification du code.

**Déclencheurs**:
- Push sur la branche `main`
- Pull Request vers la branche `main`

**Étapes**:
- Configuration de l'environnement Node.js (versions 16.x et 18.x)
- Configuration d'une instance MongoDB pour les tests
- Installation des dépendances
- Création d'un fichier `.env` pour les tests
- Exécution des tests

### 2. Docker Build and Push (`docker-build.yml`)

**Fonction**: Construction et publication de l'image Docker.

**Déclencheurs**:
- Push sur la branche `main`
- Push de tags commençant par `v` (pour les versions)

**Étapes**:
- Connexion au GitHub Container Registry
- Extraction des métadonnées pour le tag Docker
- Construction de l'image Docker
- Publication de l'image vers GitHub Container Registry

### 3. Security Scan (`security-scan.yml`)

**Fonction**: Analyse de sécurité du code et des dépendances.

**Déclencheurs**:
- Push sur la branche `main`
- Pull Request vers la branche `main`
- Planification hebdomadaire (tous les dimanches à minuit)

**Étapes**:
- Installation des dépendances
- Exécution de `npm audit` pour vérifier les vulnérabilités connues
- Analyse avec Snyk pour des vulnérabilités plus détaillées

### 4. Deploy (`deploy.yml`)

**Fonction**: Déploiement automatique de l'application.

**Déclencheurs**:
- Exécution réussie du workflow "Docker Build and Push" sur la branche `main`

**Étapes**:
- Connexion au serveur de déploiement via SSH
- Mise à jour et redémarrage de l'application avec Docker Compose

### 5. Dependency Check (`dependency-check.yml`)

**Fonction**: Vérification des dépendances obsolètes.

**Déclencheurs**:
- Planification hebdomadaire (tous les lundis à minuit)
- Déclenchement manuel via l'interface GitHub

**Étapes**:
- Installation des dépendances
- Vérification des paquets npm obsolètes
- Recherche des vulnérabilités de sécurité

## Configuration requise

Pour que ces workflows fonctionnent correctement, vous devez configurer certains secrets dans votre dépôt GitHub:

1. Pour le déploiement:
   - `DEPLOY_HOST`: L'adresse IP ou le nom d'hôte du serveur de déploiement
   - `DEPLOY_USERNAME`: Le nom d'utilisateur pour la connexion SSH
   - `DEPLOY_KEY`: La clé SSH privée pour l'authentification

2. Pour Snyk (optionnel):
   - `SNYK_TOKEN`: Votre token d'API Snyk

## Personnalisation

Vous pouvez personnaliser ces workflows selon vos besoins spécifiques:

- Modifier les versions de Node.js dans la matrice de `node-ci.yml`
- Ajuster les planifications des tâches récurrentes
- Modifier le script de déploiement dans `deploy.yml` pour l'adapter à votre environnement

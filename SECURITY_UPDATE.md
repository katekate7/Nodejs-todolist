# Mise à jour des dépendances (10 août 2025)

## Vulnérabilités résolues

Une mise à jour de sécurité a été effectuée pour résoudre plusieurs vulnérabilités:

1. **send < 0.19.0** - Vulnérabilité d'injection de template pouvant conduire à des attaques XSS
   - Référence: [GHSA-m6fv-jmcg-4jfg](https://github.com/advisories/GHSA-m6fv-jmcg-4jfg)
   - Résolution: Mise à jour vers la dernière version

2. **serve-static ≤ 1.16.0** - Dépendance de `send` vulnérable
   - Résolution: Mise à jour vers la dernière version

3. **Autres vulnérabilités** - 10 vulnérabilités au total (3 faibles, 1 modérée, 5 élevées, 1 critique)
   - Résolution: Toutes résolues via `npm audit fix`

## Changements effectués

```
added 5 packages, removed 4 packages, changed 16 packages
```

## Vérification post-mise à jour

- Application testée et fonctionnant correctement après les mises à jour
- Aucune vulnérabilité restante détectée

## Impact sur le CI/CD

Cette mise à jour devrait permettre au workflow de sécurité `security-scan.yml` de s'exécuter sans erreur désormais.

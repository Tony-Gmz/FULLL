# Étape 3 : Qualité du code et processus CI/CD

## **1. Outils de qualité de code utilisés et pistes d'amélioration** 🛠️

### **Outils utilisés**

#### 1. **Documentation & recherche**
   - Pour produire un code propre et structuré, j’ai pris le temps de consulter régulièrement la documentation officielle des outils et des concepts utilisés (**Node.js**, **SQLite**, **DDD & CQRS**, **BDD avec Cucumber**, etc.).
   - J’ai également eu recours à des outils comme **ChatGPT** pour obtenir des conseils rapides et explorer de nouvelles approches afin de résoudre certains problèmes complexes.

#### 2. **Prettier**
   - J’ai configuré **Prettier** pour garantir une mise en forme homogène du code.
   - Cela m’a permis de me concentrer sur la logique métier sans m’inquiéter des problèmes de formatage.

#### 3. **Tests BDD avec Cucumber**
   - J’ai mis en place des tests basés sur des scénarios réels en utilisant **Cucumber**.
   - Ces tests permettent de valider les fonctionnalités critiques en simulant des interactions utilisateur.

### **Outils que nous aurions pu utiliser pour aller plus loin**

#### 1. **ESLint**
   - L’analyse statique du code avec **ESLint** aurait permis de détecter automatiquement certaines erreurs ou incohérences.
   - Il aurait également aidé à appliquer des règles de bonnes pratiques (clarté des noms de variables, gestion correcte des erreurs, etc.).

#### 3. **Jest**
   - Des tests unitaires avec un outil comme **Jest** aurait permis de tester individuellement les différentes parties du système.
   - Cela compléterait les tests BDD pour une couverture complète fine du code.

---

## **2. Transparence sur la CI/CD** 🔄

Je souhaite être transparent : la mise en place d’un processus **CI/CD** (Intégration Continue / Déploiement Continu) n’est pas quelque chose que j’ai encore pratiqué dans ma carrière de développeur.

D’après mes recherches et les bonnes pratiques, voici les étapes qu’un tel processus pourrait suivre :

### **Étapes de la CI/CD**

#### **1. Intégration continue (CI)**
   - Configurer une pipeline (avec **GitHub Actions**, **GitLab CI/CD**, ou **Jenkins**).
   - **Étape 1** : Exécuter les tests automatisés (tests BDD, tests unitaires).
   - **Étape 2** : Lancer une analyse de qualité de code (ESLint, Prettier).
   - **Étape 3** : Vérifier la couverture de tests.

#### **2. Déploiement continu (CD)**
   - Si les tests réussissent, un déploiement automatique peut être effectué vers un environnement.

---

Merci encore pour cette expèrience !


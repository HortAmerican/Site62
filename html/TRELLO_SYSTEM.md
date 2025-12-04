# 📋 SYSTÈME TRELLO - MDT KANBAN BOARD

## ✨ NOUVELLE FONCTIONNALITÉ

Un système complet de gestion de tâches **type Trello** intégré au MDT avec:
- ✅ **4 colonnes KanBan** (À Faire, En Cours, Révision, Terminé)
- ✅ **Séparation par équipe** (LSPD, EMS, FBI)
- ✅ **Drag & Drop** pour déplacer les tâches
- ✅ **Filtrage par équipe** en temps réel
- ✅ **Persistance localStorage** (sauvegarde automatique)

---

## 🎯 FEATURES

### 1. Tableau KanBan (4 Colonnes)
```
┌─────────────────┬──────────────┬────────────┬──────────┐
│  📝 À Faire     │  ⚡ En Cours │ ✔️ Révision│ ✅ Fait  │
│  (À Faire)      │  (In Progress)│ (Review)  │ (Done)   │
├─────────────────┼──────────────┼────────────┼──────────┤
│ • Tâche 1       │ • Tâche 3    │ • Tâche 5  │ • Tâche 7│
│ • Tâche 2       │ • Tâche 4    │ • Tâche 6  │ • Tâche 8│
└─────────────────┴──────────────┴────────────┴──────────┘
```

### 2. Équipes Séparées
- **🚔 LSPD** (Police) - Blue (#00bfff)
- **🚑 EMS** (Ambulances) - Green (#00dd88)
- **🕵️ FBI** (Fédéral) - Pink (#ff3366)

### 3. Filtre d'Équipe
- Toutes les équipes (par défaut)
- Filtrer par LSPD, EMS ou FBI
- Mise à jour en temps réel

### 4. Cartes de Tâches
Chaque tâche affiche:
- 🏷️ Badge d'équipe (couleur)
- 📌 Titre de la tâche
- 📝 Description courte
- 👤 Assigné à (agent responsable)
- 🎯 Priorité (🟢 Basse, 🟡 Moyenne, 🔴 Haute)
- 📅 Échéance (optional)

### 5. Ajouter une Tâche
Cliquez sur **"+ Ajouter"** dans une colonne pour:
- Entrer le titre
- Ajouter une description
- Choisir l'équipe
- Définir la priorité
- Assigner à un agent
- Définir une échéance

### 6. Drag & Drop
- **Glissez une carte** d'une colonne à une autre
- La tâche se **déplace automatiquement**
- **Sauvegarde instantanée** dans localStorage

---

## 💾 STRUCTURE DE DONNÉES

### Tâche (localStorage)
```javascript
{
  id: 1701363600000,              // Timestamp unique
  title: "Patrouille Secteur 5",   // Titre
  desc: "Surveillance accrue...",  // Description
  column: "in-progress",           // État (todo, in-progress, review, done)
  team: "lspd",                    // Équipe (lspd, ems, fbi)
  priority: "high",                // Priorité (low, medium, high)
  assignee: "Agent Smith",         // Assigné à
  deadline: "2025-12-01",          // Date limite
  created: "2025-11-30T10:00:00Z"  // Date création
}
```

### localStorage Key
- **Key:** `mdt_trello_v1`
- **Format:** JSON array de tâches
- **Sauvegarde:** Automatique après chaque action

---

## 🎨 DESIGN

### Couleurs des Colonnes
| Colonne | Couleur | Emoji |
|---------|---------|-------|
| À Faire | 🔴 Rouge | 📝 |
| En Cours | 🟡 Jaune | ⚡ |
| Révision | 🟢 Vert | ✔️ |
| Terminé | 🔵 Cyan | ✅ |

### Badges d'Équipe
- LSPD: Cyan border + cyan text
- EMS: Green border + green text
- FBI: Pink border + pink text

### Interactions
- **Hover sur carte:** Lift up (-4px), glow intensifié
- **Drag:** Cursor changes to "grabbing"
- **Drop zone:** Zone highlight (opacity 0.7)

---

## 📱 RESPONSIVE

### Desktop (>900px)
- 4 colonnes côte à côte
- Pleine largeur

### Tablet (600-900px)
- 2 colonnes par ligne
- Scroll horizontal

### Mobile (<600px)
- 1 colonne full-width
- Scroll vertical complet

---

## 🔧 FONCTIONS JAVASCRIPT

### `getTrelloTasks()`
Récupère les tâches du localStorage
```javascript
const tasks = getTrelloTasks()
```

### `saveTrelloTasks(tasks)`
Sauvegarde les tâches au localStorage
```javascript
saveTrelloTasks(tasks)
```

### `renderTrelloBoard()`
Rendu du tableau avec filtrage
```javascript
renderTrelloBoard()
```

### `addTrelloTask(column, team)`
Ajoute une tâche
```javascript
addTrelloTask('in-progress', 'lspd')
```

### `moveTrelloTask(taskId, newColumn)`
Déplace une tâche vers une nouvelle colonne
```javascript
moveTrelloTask(1701363600000, 'done')
```

### `openTrelloModal()` / `closeTrelloModal()`
Gère le modal d'ajout de tâche
```javascript
openTrelloModal()
closeTrelloModal()
```

---

## 📋 UTILISATION WORKFLOW

### 1. Créer une Tâche
```
1. Cliquer sur "📋 Trello" dans le sidebar
2. Cliquer "+ Ajouter" dans la colonne souhaitée
3. Remplir le formulaire:
   - Titre (obligatoire)
   - Description
   - Équipe responsable
   - Priorité
   - Agent assigné
   - Date limite
4. Cliquer "Ajouter"
5. Tâche apparaît dans la colonne
```

### 2. Filtrer par Équipe
```
1. Cliquer sur le dropdown "Toutes les équipes"
2. Sélectionner LSPD / EMS / FBI
3. Tableau se met à jour en temps réel
4. Seules les tâches de l'équipe s'affichent
```

### 3. Déplacer une Tâche
```
1. Glisser une carte d'une colonne
2. Relâcher dans une nouvelle colonne
3. Tâche se déplace
4. Colonne mise à jour
5. Changement sauvegardé
```

### 4. Voir Détails
```
1. Cliquer sur une carte
2. Badge d'équipe + Titre + Description
3. Agent assigné + Priorité
4. Date limite (si définie)
```

---

## 💡 CAS D'USAGE

### LSPD - Patrouille
- **À Faire:** Missions assignées non commencées
- **En Cours:** Patrouilles en cours
- **Révision:** Rapports à vérifier
- **Terminé:** Missions complétées

### EMS - Interventions
- **À Faire:** Appels d'urgence en attente
- **En Cours:** Interventions actives
- **Révision:** Patients à suivre
- **Terminé:** Interventions fermées

### FBI - Enquêtes
- **À Faire:** Enquêtes ouvertes
- **En Cours:** Enquêtes actives
- **Révision:** Preuves à valider
- **Terminé:** Enquêtes closes

---

## 🎯 EXEMPLE DE DONNÉES

### Tâche LSPD (Police)
```javascript
{
  id: 1701363600001,
  title: "Patrouille Secteur 5",
  desc: "Surveillance accrue, incident signalé hier",
  column: "in-progress",
  team: "lspd",
  priority: "high",
  assignee: "Agent Smith",
  deadline: "2025-12-01"
}
```

### Tâche EMS (Ambulance)
```javascript
{
  id: 1701363600002,
  title: "Urgence Hôpital Central",
  desc: "Patient critique, transport nécessaire",
  column: "in-progress",
  team: "ems",
  priority: "high",
  assignee: "Paramedic Johnson",
  deadline: "2025-11-30"
}
```

### Tâche FBI (Investigation)
```javascript
{
  id: 1701363600003,
  title: "Enquête Braquage",
  desc: "Analyse des preuves, témoignages à recueillir",
  column: "review",
  team: "fbi",
  priority: "medium",
  assignee: "Agent Brown",
  deadline: "2025-12-05"
}
```

---

## 📊 STATISTIQUES

### Compteurs Potentiels
```
À Faire:    5 tâches
En Cours:   3 tâches
Révision:   2 tâches
Terminé:    12 tâches
```

---

## 🔐 PERSISTANCE

### localStorage
- **Key:** `mdt_trello_v1`
- **Durée:** Permanent
- **Limite:** 5-10MB (suffisant)

### Sauvegarde Automatique
- Après chaque modification
- Pas d'action utilisateur requise
- Synchronisation instantanée

---

## 🚀 AMÉLIORATIONS FUTURES

- [ ] Drag & drop amélioré (ghost image)
- [ ] Édition de tâche existante
- [ ] Suppression de tâche
- [ ] Commentaires sur les tâches
- [ ] Assignation multiple
- [ ] Notifications de deadline
- [ ] Export en CSV/PDF
- [ ] Historique des modifications
- [ ] Checklists dans les tâches
- [ ] Étiquettes personnalisées
- [ ] Recherche/filtrage avancé
- [ ] Intégration avec calendrier

---

## ✅ STATUT

- ✅ HTML structure complète
- ✅ CSS styles complets
- ✅ JavaScript drag & drop
- ✅ Filtrage par équipe
- ✅ localStorage persistance
- ✅ Modal d'ajout de tâche
- ✅ Responsive design
- ✅ Production-ready

**TRELLO SYSTEM: READY TO USE! 🚀📋**

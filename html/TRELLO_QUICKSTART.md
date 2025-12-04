# 🎯 GUIDE RAPIDE - SYSTÈME TRELLO

## ✨ NOUVELLE FONCTIONNALITÉ AJOUTÉE

Un système **KanBan style Trello** complet intégré au MDT!

---

## 🚀 COMMENT UTILISER

### 1. Accéder au Trello
```
1. Ouvrir le MDT (file:///d:/mdt/html/index.html)
2. Cliquer sur "📋 Trello" dans la barre latérale
3. Tableau KanBan s'affiche avec 4 colonnes
```

### 2. Charger les Données de Test (OPTIONNEL)
```
1. F12 pour ouvrir DevTools
2. Aller à Console
3. Copier-coller dans la console:
   localStorage.setItem('mdt_trello_v1', JSON.stringify([
     {id:1,title:"Test LSPD",team:"lspd",column:"todo",priority:"high",desc:"Tâche test",assignee:"Agent Smith",deadline:"2025-12-01"}
   ])); location.reload()
4. Page se recharge, données apparaissent
```

### 3. Ajouter une Tâche
```
1. Cliquer "+ Ajouter" dans la colonne souhaitée
2. Modal s'ouvre avec formulaire
3. Remplir:
   • Titre (obligatoire)
   • Description
   • Équipe (LSPD / EMS / FBI)
   • Priorité (Basse / Moyenne / Haute)
   • Assigné à (nom de l'agent)
   • Échéance (date)
4. Cliquer "Ajouter"
5. Tâche apparaît dans la colonne
```

### 4. Filtrer par Équipe
```
1. Dropdown "Toutes les équipes" en haut
2. Sélectionner LSPD / EMS / FBI
3. Tableau se met à jour
4. Seules les tâches de l'équipe s'affichent
```

### 5. Déplacer une Tâche (Drag & Drop)
```
1. Cliquer et glisser une carte
2. Relâcher dans une autre colonne
3. Tâche se déplace automatiquement
4. État mis à jour
5. Changement sauvegardé
```

---

## 📊 4 COLONNES KANBAN

| Colonne | Couleur | Emoji | Utilisation |
|---------|---------|-------|------------|
| À Faire | 🔴 Rouge | 📝 | Tâches non démarrées |
| En Cours | 🟡 Jaune | ⚡ | Tâches en cours |
| Révision | 🟢 Vert | ✔️ | En attente de vérification |
| Terminé | 🔵 Cyan | ✅ | Tâches complétées |

---

## 👥 3 ÉQUIPES SÉPARÉES

### 🚔 LSPD (Police)
- Patrouilles
- Rapports
- Enquêtes
- Badge cyan

### 🚑 EMS (Ambulances)
- Interventions
- Suivis patients
- Formation
- Badge vert

### 🕵️ FBI (Fédéral)
- Investigations
- Surveillance
- Preuves
- Badge rose

---

## 💾 PERSISTANCE

✅ **Automatique** - localStorage (mdt_trello_v1)
✅ **Sauvegarde instantanée** après chaque action
✅ **Permanent** - Données restent entre sessions

---

## 🎨 DESIGN

### Cartes de Tâches
```
┌─────────────────────────────────┐
│ 🚔 LSPD                 (badge) │
├─────────────────────────────────┤
│ Patrouille Secteur 5    (titre) │
├─────────────────────────────────┤
│ Surveillance accrue...  (desc)  │
├─────────────────────────────────┤
│ Agent Smith  |  🔴    (assingnee + priorité)
│ 2025-12-01   (deadline)          │
└─────────────────────────────────┘
```

### Priorités
- 🟢 Basse (Low)
- 🟡 Moyenne (Medium)
- 🔴 Haute (High)

---

## 🔄 FLUX DE TRAVAIL TYPIQUE

### LSPD
```
À Faire → En Cours → Révision → Terminé
(Mission) (Exécution) (Rapport) (Fermée)
```

### EMS
```
À Faire → En Cours → Révision → Terminé
(Appel)   (Secours)  (Suivi)    (Fermée)
```

### FBI
```
À Faire → En Cours → Révision → Terminé
(Enquête) (Enquête)  (Preuves)  (Close)
```

---

## 📱 RESPONSIVE

- **Desktop:** 4 colonnes côte à côte
- **Tablet:** 2 colonnes par ligne
- **Mobile:** 1 colonne full-width

---

## 🎯 EXEMPLES DE TÂCHES

### LSPD
- "Patrouille Secteur 5" - Priority: HIGH
- "Rapport Accident" - Priority: MEDIUM
- "Investigation Vol" - Priority: HIGH

### EMS
- "Urgence Hôpital" - Priority: HIGH
- "Suivi Patient" - Priority: MEDIUM
- "Formation RCP" - Priority: MEDIUM

### FBI
- "Enquête Braquage" - Priority: HIGH
- "Interrogatoire" - Priority: HIGH
- "Validation Preuves" - Priority: HIGH

---

## 💡 TRUCS & ASTUCES

1. **Glisser-déposer:** Cliquez et glissez une carte
2. **Filtrer:** Utilisez le dropdown pour une équipe
3. **Ajouter rapide:** Cliquez "+ Ajouter" dans colonne
4. **Priorités:** 🟢🟡🔴 pour identifier rapidement
5. **Assignation:** Champ "Assigné à" pour responsabilité
6. **Deadline:** Entrez date pour urgence

---

## 🚀 PRÊT À UTILISER

✅ HTML structure complète
✅ CSS styles colorés
✅ JavaScript fonctionnel
✅ Drag & Drop activé
✅ Filtrage équipes
✅ localStorage persistance
✅ Modal d'ajout
✅ Production-ready

**Le système Trello est opérationnel! 📋✨**

---

## 📝 FICHIERS

- `index.html` - Structure HTML (nouveau tab Trello + modal)
- `style.css` - Styles KanBan (300+ lignes)
- `script.js` - Logique Trello (200+ lignes)
- `TRELLO_SYSTEM.md` - Documentation complète
- `trello-sample-data.js` - Données d'exemple test

---

## ⚡ QUICK START

1. Ouvrez `index.html`
2. Connectez-vous
3. Cliquez "📋 Trello"
4. Cliquez "+ Ajouter" dans "À Faire"
5. Remplissez le formulaire
6. Cliquez "Ajouter"
7. Drag & drop pour déplacer
8. Voir les changements en temps réel!

**Enjoy! 🎉**

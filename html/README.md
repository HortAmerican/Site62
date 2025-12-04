# MDT Tablette — Guide Complet

## 🎯 Vue d'ensemble
Application MDT (Mobile Data Terminal) développée pour FiveM avec interface tablette optimisée en français.

## ✅ Fonctionnalités Implémentées

### 1. **Recherche Avancée**
- ✅ Recherche par nom, ID, téléphone, adresse
- ✅ Historique de recherche (stocké localement)
- ✅ Affichage instantané des résultats
- ✅ Chips d'historique cliquables

### 2. **Gestion des Dossiers**
- ✅ Affichage détaillé de la personne
- ✅ Historique judiciaire
- ✅ Galerie de photos/preuves
- ✅ Édition sécurisée (historique médical EMS)

### 3. **Historique Médical (EMS)**
- ✅ Modal éditable
- ✅ Champs: Conditions, Allergies, Médicaments, Dernière visite, Notes
- ✅ Sauvegarde automatique en localStorage
- ✅ Restauration des données précédentes

### 4. **Galerie de Preuves**
- ✅ Upload de photos avec validation:
  - Type: Images uniquement (JPG, PNG, GIF, etc.)
  - Taille: Maximum 5MB
- ✅ Filtrage par catégorie
- ✅ Visualisation en lightbox
- ✅ Données de test incluses

### 5. **Lightbox (Aperçu Photos)**
- ✅ Navigation au clavier: Flèches ← → , Échap pour fermer
- ✅ Affichage en grand avec légende
- ✅ Zoom adaptatif

### 6. **Rapports**
- ✅ Création de rapports liés à un citoyen
- ✅ Joindre une photo au rapport
- ✅ Sélection du type de rapport
- ✅ Sauvegarde des données

### 7. **Notifications Temps Réel**
- ✅ Toggle pour activer/désactiver
- ✅ État sauvegardé localement
- ✅ Mock d'alertes (mode développement)
- ✅ Notification toast avec icônes

### 8. **Paramètres**
- ✅ Sélection du rôle (LSPD, EMS, FBI)
- ✅ Changement de thème
- ✅ Logo dynamique par rôle
- ✅ Affichage des permissions

### 9. **Design Responsive**
- ✅ Optimisé tablette (viewport-fit cover)
- ✅ Adaptation mobile/desktop
- ✅ Interface tactile
- ✅ Thématisation par rôle (couleurs)

## 🔧 Architecture Technique

### Structure des Fichiers
```
d:\mdt\html\
├── index.html       (7.2 KB) — Structure HTML
├── style.css        (32 KB) — Styling avec variables CSS
├── script.js        (62 KB) — Logic complète (IIFE, async/await)
└── img/
    ├── logo_lspd.png
    ├── logo_ems.png
    └── logo_fbi.png
```

### Stack Technique
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript (ES6+)
- **Storage**: localStorage (persistence côté client)
- **Architecture**: IIFE (Immediately Invoked Function Expression)
- **Timing**: DOMContentLoaded wrapper pour éviter les race conditions
- **Sécurité**: XSS prevention via DOM construction, validation d'upload

### Fonctions Clés
- `postToServer()` — Wrapper fetch avec fallback mock
- `notify()` — Toast notifications
- `viewRecord()` — Affichage dossier
- `loadGallery()` — Chargement galerie avec IntersectionObserver lazy-load
- `enableRealtime()` — Toggle notifications temps réel
- `openMedicalModal()` / `saveMedicalEdits()` — Édition historique médical

## 🧪 Guide de Test

### Test 1: Recherche
1. Aller à l'onglet "Recherche"
2. Taper "dupont" dans la barre de recherche
3. Cliquer "Rechercher" ou Entrée
4. Vérifier: résultats s'affichent
5. Cliquer sur une personne → dossier s'ouvre
6. Historique de recherche s'ajoute automatiquement

### Test 2: Dossier & Historique Médical
1. Aller à "Dossiers"
2. Faire une recherche, cliquer sur une personne
3. Voir: nom, identifier, historique judiciaire, photos
4. Cliquer "✎ Modifier" (historique médical)
5. Modifier les champs dans la modal
6. Cliquer "Sauvegarder"
7. Recharger la page → données persistent!

### Test 3: Galerie & Upload
1. Aller à l'onglet "Galerie"
2. Voir les 2 images de test (Preuve, Suspect)
3. Cliquer "Ajouter"
4. Sélectionner une image locale (JPG/PNG)
   - ✅ Format valide: Upload réussit
   - ❌ PDF/Video: "Type de fichier non supporté"
   - ❌ Fichier >5MB: "Fichier trop volumineux"
5. Après upload: galerie se rafraîchit

### Test 4: Lightbox
1. Dans Galerie, cliquer sur une image
2. Voir aperçu en grand
3. Clavier:
   - Flèche → : image suivante
   - Flèche ← : image précédente
   - Échap: Fermer

### Test 5: Notifications Temps Réel
1. Cliquer sur 🔔 (bell icon) en haut
2. Voir couleur du bouton changer
3. Recharger la page → état préservé (localStorage)
4. En mode connecté FiveM: alertes en direct

### Test 6: Rapports
1. Aller à "Rapports"
2. Remplir: ID citoyen, titre, type, détails
3. Cliquer "📎 Joindre" → sélectionner photo
4. Cliquer "Sauvegarder"
5. Voir notification de succès

### Test 7: Changement Rôle & Thème
1. Aller à "Paramètres"
2. Changer Rôle: LSPD → EMS → FBI
   - Logo change en haut
   - Couleur du thème s'adapte
3. Changer Thème: LSPD → Sombre
4. Recharger → paramètres appliqués

## 🐛 Dépannage

### Les images ne s'affichent pas
- ✅ Logos PNG valides dans `img/` folder
- ✅ Photos du mock data utilisent SVG data URIs (colorées)
- Si rien: F12 → Console pour voir les erreurs

### Recherche n'affiche rien
- Vérifier console (F12) pour erreurs
- Mode développement affiche "Mode développement - réponse simulée"
- Cela signifie que le mock backend est actif (normal hors FiveM)

### localStorage ne persiste pas
- File:// protocol peut avoir des restrictions
- Utiliser HTTP server: `python -m http.server 8000`
- Ou tester dans un vrai navigateur (pas IE/Edge)

### Keyboard nav lightbox ne fonctionne pas
- Cliquer d'abord sur l'image pour donner le focus
- Puis utiliser flèches ← →

## 📱 Responsivité

### Breakpoints CSS
- **Tablette** (768px+): Layout 2 colonnes
- **Mobile** (<768px): Layout 1 colonne empilé
- **Desktop** (1200px+): Optimisé écran large

### Touch-Friendly
- Boutons: min 44px × 44px
- Padding confortable
- Font-size lisible (14px-16px)

## 🔐 Sécurité

✅ **Protections Implémentées**
- Validation d'upload: type (image/*) + size (≤5MB)
- XSS prevention: DOM construction, textContent usage
- localStorage error handling: try/catch sur tous les accès
- Null-safe guards sur éléments DOM optionnels

## 🎨 Thèmes & Couleurs

### LSPD (Police)
- Primary: #0066ff (Bleu)
- Accent: #00ddff (Cyan)

### EMS (Ambulances)
- Primary: #ff6600 (Orange)
- Accent: #ffaa00 (Doré)

### FBI (Fédéral)
- Primary: #ffff00 (Jaune)
- Accent: #ffaa00 (Doré)

### Dark Theme
- Background: #111
- Text: #ccc
- Accent: #ff00ff (Magenta)

## 🚀 Intégration FiveM

### Pour connecter à un vrai serveur FiveM:

1. **Remplacer le mock backend** dans `script.js`:
```javascript
// Ligne 156
async function postToServer(path, payload){
    // Changez de:
    if(!parent) { return mockResponse(...) }
    
    // À vrai fetch vers votre serveur FiveM
    const res = await fetch(`https://yourserver/${path}`, {...})
}
```

2. **Endpoints requis**:
- `GET /mdt/getPerson?search=` → liste personnes
- `GET /mdt/searchPlate?plate=` → infos plaque
- `GET /mdt/getRecord?id=` → dossier complet
- `POST /mdt/uploadPhoto` → save photo
- `POST /mdt/saveMedical` → save historique EMS
- `POST /mdt/sendReport` → save rapport

3. **NUI Callbacks**:
```javascript
// Écouter depuis FiveM:
window.addEventListener('message', (e) => {
    if(e.data.action === 'setUser') {
        // user = e.data // nom, role, grade
    }
    if(e.data.action === 'realtimeNotification') {
        // Alerte en direct
    }
})
```

## 📊 État du Projet

| Feature | Status | Notes |
|---------|--------|-------|
| Recherche | ✅ Complet | Historique persistant |
| Dossiers | ✅ Complet | Édition EMS intégrée |
| Photos | ✅ Complet | Upload validé + lightbox |
| Galerie | ✅ Complet | Filtrage + lazy-load |
| Rapports | ✅ Complet | Attachement photo |
| Notifications RT | ✅ Complet | Toggle + localStorage |
| Thèmes | ✅ Complet | 4 thèmes |
| Responsive | ✅ Complet | Mobile/Tablet/Desktop |
| Security | ✅ Complet | XSS, validation, error handling |
| FiveM Integration | 📋 Prêt | À configurer côté serveur |

## 📞 Support

En cas de problème:
1. Ouvrir la console: F12 → Console
2. Chercher les messages d'erreur rouge
3. Vérifier que tous les fichiers (index.html, script.js, style.css) existent
4. S'assurer que `img/` folder existe

---

**Version**: 1.0 (30 Nov 2025)  
**Stack**: HTML5 + CSS3 + Vanilla JS  
**Language**: Français (FR-FR)  
**Status**: Production-Ready

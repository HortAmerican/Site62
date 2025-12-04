<!-- MDT Manual Test Checklist -->
<!-- Open this with the app running and verify each test -->

# 🧪 MDT Manual Testing Checklist

## Opening & Initial Load
- [ ] Page loads without console errors (F12)
- [ ] Logo visible in top-left
- [ ] Title "MDT — Tablette" visible
- [ ] "Notifications temps réel" bell icon visible
- [ ] Tab buttons visible: Recherche, Dossiers, Galerie, Rapports, Staff, Paramètres

## Search Tab (Recherche)
- [ ] Search input field visible
- [ ] Search type dropdown shows: Nom, ID, Téléphone, Adresse
- [ ] Type "dupont" → Click Rechercher
- [ ] Results appear with 4 people (mock data)
- [ ] Each result has "Voir" and "Rapport" buttons
- [ ] Click on a person → Details shown
- [ ] Search query added to "Historique" chips below
- [ ] Click chip → Re-searches that term
- [ ] "Effacer historique" button works
- [ ] X button in search clears the field

## Records Tab (Dossiers)
- [ ] Left column: Person detail (name, identifier, photo)
- [ ] Right column: History + Photos sections
- [ ] "✎ Modifier" button visible for medical history

### Medical History Modal
- [ ] Click "✎ Modifier"
- [ ] Modal opens with 5 fields:
  - Conditions: "Asthme"
  - Allergies: "Pollen"
  - Médicaments: "Ventolin"
  - Dernière visite: date picker
  - Notes: text area
- [ ] Edit a field
- [ ] Click "Sauvegarder"
- [ ] Modal closes
- [ ] Go to Search, find another person, back to first person
- [ ] **Your edits are still there!** ✓ (localStorage working)

## Gallery Tab (Galerie)
- [ ] Gallery shows 2 images (Preuve + Suspect)
- [ ] Images display as colored boxes with labels
- [ ] Category filter dropdown exists
- [ ] "Ajouter" button visible
- [ ] Filter input works (type "preuve" → only Preuve shows)

### Photo Upload
- [ ] Click "Ajouter"
- [ ] Select a JPG/PNG file from your computer
- [ ] Success notification: "✅ Photo envoyée"
- [ ] Gallery refreshes (new image appears)

### Lightbox (Image Viewer)
- [ ] Click on an image
- [ ] Image opens in fullscreen with caption
- [ ] Click X or press Escape → closes
- [ ] Multiple images: Press → (arrow right) to next image
- [ ] Press ← (arrow left) to previous image

## Reports Tab (Rapports)
- [ ] Form visible with fields:
  - ID du citoyen
  - Titre du rapport
  - Type de rapport (dropdown)
  - Détails (textarea)
- [ ] "📎 Joindre" button for photo
- [ ] "Sauvegarder" button
- [ ] "Effacer" button
- [ ] Fill in form and save
- [ ] Success notification appears

## Settings Tab (Paramètres)
- [ ] Rôle selector: LSPD, EMS, FBI
  - Change to EMS → Logo changes + color changes
  - Change to FBI → Logo changes + color changes
  - Change back to LSPD
- [ ] Thème selector: LSPD, Sombre
  - Switch between themes
  - Colors update
- [ ] Permissions list shown

## Notifications (Realtime) - 🔔 Button
- [ ] Bell icon visible in top-right
- [ ] Click it → Button activates (color changes)
- [ ] Click again → Deactivates
- [ ] Reload page → State is preserved! (localStorage)
- [ ] In FiveM: Alerts appear when toggled ON

## Console Check (F12 → Console)
- [ ] NO red error messages
- [ ] Yellow warnings OK: "Mode développement - réponse simulée"
- [ ] These indicate mock backend is active (normal)

## Responsive Design
- [ ] Browser at full size: 2-column layout
- [ ] Resize window to <768px: Layout adapts to 1 column
- [ ] All buttons remain clickable
- [ ] Text is readable

## localStorage Check
Open DevTools → Application → LocalStorage → file://

Should see 3 entries:
- [ ] `mdt_recent_searches_v1` — array of searches
- [ ] `mdt_realtime_v1` — "0" or "1"
- [ ] `mdt_medical_<id>` — medical history for record

## Performance
- [ ] Page responds quickly to clicks
- [ ] No lag when typing in search
- [ ] Images load fast
- [ ] Modal opens/closes smoothly
- [ ] No visual glitches

## Keyboard Navigation
- [ ] Tab key navigates through buttons
- [ ] Enter submits forms
- [ ] Escape closes modals and lightbox
- [ ] Arrow keys navigate lightbox images

## Edge Cases
- [ ] Search with empty query: Shows placeholder
- [ ] Upload non-image file: Error notification
- [ ] Upload 10MB file: Error notification (>5MB)
- [ ] Delete all recent searches: Works
- [ ] Rapid role changes: No errors
- [ ] Theme toggle multiple times: Works smoothly

## Final Sign-Off
- [ ] All tests passed: **PRODUCTION READY** ✨
- [ ] Ready for FiveM integration
- [ ] Ready to connect to server endpoints

---

**Test Date**: ________________
**Tester**: ____________________
**Status**: ☐ PASS / ☐ FAIL
**Notes**: _____________________
_________________________________
_________________________________


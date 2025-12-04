// Exemple de données Trello pour test
// Copiez cette données dans la console et exécutez:
// localStorage.setItem('mdt_trello_v1', JSON.stringify([...données...]))

const sampleTrelloData = [
  // LSPD - À Faire
  {
    id: 1701363600001,
    title: "Patrouille Secteur 5",
    desc: "Surveillance accrue, incident signalé hier",
    column: "todo",
    team: "lspd",
    priority: "high",
    assignee: "Agent Smith",
    deadline: "2025-12-01",
    created: "2025-11-30T08:00:00Z"
  },
  {
    id: 1701363600002,
    title: "Rapport Accident",
    desc: "Documenter l'accident véhicule sur Main St",
    column: "todo",
    team: "lspd",
    priority: "medium",
    assignee: "Officer Davis",
    deadline: "2025-12-02",
    created: "2025-11-30T08:15:00Z"
  },
  
  // LSPD - En Cours
  {
    id: 1701363600003,
    title: "Investigation Vol",
    desc: "Enquête sur le vol de magasin Downtown",
    column: "in-progress",
    team: "lspd",
    priority: "high",
    assignee: "Detective Johnson",
    deadline: "2025-12-03",
    created: "2025-11-30T08:30:00Z"
  },
  {
    id: 1701363600004,
    title: "Contrôle de Vitesse",
    desc: "Zone résidentielle, limite 30km/h",
    column: "in-progress",
    team: "lspd",
    priority: "low",
    assignee: "Cadet Miller",
    deadline: "2025-12-01",
    created: "2025-11-30T09:00:00Z"
  },
  
  // LSPD - Révision
  {
    id: 1701363600005,
    title: "Rapport Incident",
    desc: "Rapport à vérifier avant archivage",
    column: "review",
    team: "lspd",
    priority: "medium",
    assignee: "Sergeant Wilson",
    deadline: "2025-11-30",
    created: "2025-11-30T09:30:00Z"
  },
  
  // LSPD - Terminé
  {
    id: 1701363600006,
    title: "Patrouille Routine",
    desc: "Patrouille Secteur 3 complétée",
    column: "done",
    team: "lspd",
    priority: "low",
    assignee: "Officer Brown",
    deadline: "2025-11-29",
    created: "2025-11-29T10:00:00Z"
  },
  
  // EMS - À Faire
  {
    id: 1701363600007,
    title: "Formation RCP",
    desc: "Mise à jour annuelle formation réanimation",
    column: "todo",
    team: "ems",
    priority: "medium",
    assignee: "Paramedic Lee",
    deadline: "2025-12-05",
    created: "2025-11-30T08:00:00Z"
  },
  {
    id: 1701363600008,
    title: "Vérification Ambulance",
    desc: "Inspection équipement ambulance #3",
    column: "todo",
    team: "ems",
    priority: "high",
    assignee: "Technician Garcia",
    deadline: "2025-12-01",
    created: "2025-11-30T08:45:00Z"
  },
  
  // EMS - En Cours
  {
    id: 1701363600009,
    title: "Urgence Hôpital Central",
    desc: "Patient critique, transport en cours",
    column: "in-progress",
    team: "ems",
    priority: "high",
    assignee: "Paramedic Martinez",
    deadline: "2025-11-30",
    created: "2025-11-30T09:15:00Z"
  },
  {
    id: 1701363600010,
    title: "Suivi Patient",
    desc: "Visite suivi post-intervention",
    column: "in-progress",
    team: "ems",
    priority: "medium",
    assignee: "Nurse Thompson",
    deadline: "2025-12-02",
    created: "2025-11-30T10:00:00Z"
  },
  
  // EMS - Révision
  {
    id: 1701363600011,
    title: "Rapport Intervention",
    desc: "Documentation médicale à compléter",
    column: "review",
    team: "ems",
    priority: "high",
    assignee: "Doctor Anderson",
    deadline: "2025-11-30",
    created: "2025-11-30T10:30:00Z"
  },
  
  // EMS - Terminé
  {
    id: 1701363600012,
    title: "Intervention Routine",
    desc: "Appel de routine complété",
    column: "done",
    team: "ems",
    priority: "low",
    assignee: "Paramedic Chen",
    deadline: "2025-11-29",
    created: "2025-11-29T14:00:00Z"
  },
  
  // FBI - À Faire
  {
    id: 1701363600013,
    title: "Enquête Braquage",
    desc: "Investigation braquage banque, analyse preuves",
    column: "todo",
    team: "fbi",
    priority: "high",
    assignee: "Special Agent Brown",
    deadline: "2025-12-10",
    created: "2025-11-30T08:00:00Z"
  },
  {
    id: 1701363600014,
    title: "Surveillance Suspect",
    desc: "Mise en place surveillance secteur commercial",
    column: "todo",
    team: "fbi",
    priority: "medium",
    assignee: "Agent Taylor",
    deadline: "2025-12-04",
    created: "2025-11-30T09:00:00Z"
  },
  
  // FBI - En Cours
  {
    id: 1701363600015,
    title: "Interrogatoire",
    desc: "Interrogatoire suspect identifié",
    column: "in-progress",
    team: "fbi",
    priority: "high",
    assignee: "Agent Williams",
    deadline: "2025-12-01",
    created: "2025-11-30T09:45:00Z"
  },
  
  // FBI - Révision
  {
    id: 1701363600016,
    title: "Validation Preuves",
    desc: "Analyse légale des preuves collectées",
    column: "review",
    team: "fbi",
    priority: "high",
    assignee: "Forensic Expert Walsh",
    deadline: "2025-12-02",
    created: "2025-11-30T10:15:00Z"
  },
  
  // FBI - Terminé
  {
    id: 1701363600017,
    title: "Enquête Cybercrime",
    desc: "Enquête cybercrime fermée, suspect arrêté",
    column: "done",
    team: "fbi",
    priority: "high",
    assignee: "Cyber Agent Torres",
    deadline: "2025-11-28",
    created: "2025-11-28T11:00:00Z"
  }
]

// Pour charger les données de test dans le navigateur:
// 1. Ouvrir index.html
// 2. Appuyer sur F12 pour ouvrir DevTools
// 3. Aller à l'onglet Console
// 4. Copier-coller et exécuter:

// localStorage.setItem('mdt_trello_v1', JSON.stringify(sampleTrelloData))
// location.reload()

console.log('Sample Trello data ready!')
console.log('Paste this in console to load: localStorage.setItem("mdt_trello_v1", JSON.stringify(sampleTrelloData)); location.reload()')

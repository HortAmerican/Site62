// Configuration et constantes
const CONFIG = {
    API_URL: 'https://api.example.com/police',
    UPDATE_INTERVAL: 30000, // 30 secondes
    SESSION_TIMEOUT: 1800000 // 30 minutes
};

// État global de l'application
const APP_STATE = {
    currentUser: null,
    vehicles: [],
    selectedVehicles: new Set(),
    currentTab: 'dashboard',
    isFullscreen: false,
    notifications: [],
    sessionTimer: null
};

// Données de démonstration
const DEMO_DATA = {
    vehicles: [
        {
            id: 'VH-2025-001',
            name: 'Accueil',
            type: 'admin',
            status: 'active',
            purchaseDate: '2025-11-28',
            buyer: { id: 'USR001', name: 'Koffi Diabo', role: 'Agent' },
            seller: { id: 'SEL001', name: 'Siana Fiercoy', role: 'Concessionnaire' },
            price: 45000,
            details: { model: 'Véhicule administratif', year: 2024, engine: 'Électrique' }
        },
        {
            id: 'VH-2025-002',
            name: 'Effectifs',
            type: 'personnel',
            status: 'active',
            purchaseDate: '2025-11-27',
            buyer: { id: 'USR002', name: 'Scott Darryon', role: 'Sergent' },
            seller: { id: 'SEL002', name: 'Luis Castillo', role: 'Fournisseur' },
            price: 38000,
            details: { model: 'Véhicule de patrouille', year: 2023, engine: 'Hybride' }
        },
        {
            id: 'VH-2025-003',
            name: 'Citoyens',
            type: 'public',
            status: 'active',
            purchaseDate: '2025-11-27',
            buyer: { id: 'USR003', name: 'Kyle Rogers', role: 'Lieutenant' },
            seller: { id: 'SEL002', name: 'Luis Castillo', role: 'Fournisseur' },
            price: 42000,
            details: { model: 'Véhicule de service public', year: 2024, engine: 'Essence' }
        },
        {
            id: 'VH-2025-004',
            name: 'Formations',
            type: 'training',
            status: 'pending',
            purchaseDate: '2025-11-26',
            buyer: { id: 'USR004', name: 'Malna Lockwood', role: 'Instructeur' },
            seller: { id: 'SEL003', name: 'Sylas Blackwood', role: 'Concessionnaire' },
            price: 52000,
            details: { model: 'Véhicule d\'entraînement', year: 2024, engine: 'Diesel' }
        },
        {
            id: 'VH-2025-005',
            name: 'Registre',
            type: 'admin',
            status: 'active',
            purchaseDate: '2025-11-26',
            buyer: { id: 'USR005', name: 'Alaia Ingram', role: 'Capitaine' },
            seller: { id: 'SEL004', name: 'Alden Parker', role: 'Fournisseur' },
            price: 48000,
            details: { model: 'Véhicule de documentation', year: 2024, engine: 'Électrique' }
        }
    ],
    stats: {
        total: 10,
        active: 8,
        pending: 2,
        inactive: 1
    }
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initApplication();
});

function initApplication() {
    setupEventListeners();
    loadDemoData();
    startSessionTimer();
    updateDashboardStats();
    setupRealTimeUpdates();
}

// Gestion des événements
function setupEventListeners() {
    // Connexion/Déconnexion
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    
    // Actions rapides
    document.getElementById('quickAddBtn').addEventListener('click', showAddVehicleModal);
    document.getElementById('quickReportBtn').addEventListener('click', generateQuickReport);
    document.getElementById('quickSearchBtn').addEventListener('click', showAdvancedSearch);
    document.getElementById('quickStatsBtn').addEventListener('click', showAnalytics);
    
    // Tableau des véhicules
    document.getElementById('addVehicleBtn').addEventListener('click', showAddVehicleModal);
    document.getElementById('selectAll').addEventListener('change', handleSelectAll);
    document.querySelectorAll('.vehicle-select').forEach(checkbox => {
        checkbox.addEventListener('change', handleVehicleSelect);
    });
    
    // Filtres et recherche
    document.getElementById('statusFilter').addEventListener('change', filterVehicles);
    document.getElementById('sortFilter').addEventListener('change', sortVehicles);
    document.getElementById('vehicleSearch').addEventListener('input', searchVehicles);
    document.getElementById('advancedSearchBtn').addEventListener('click', showAdvancedSearch);
    
    // Actions sur les véhicules
    document.querySelectorAll('.action-btn.view').forEach(btn => {
        btn.addEventListener('click', viewVehicleDetails);
    });
    
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', editVehicle);
    });
    
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', deleteVehicle);
    });
    
    // Boutons d'action
    document.getElementById('refreshBtn').addEventListener('click', refreshData);
    document.getElementById('helpBtn').addEventListener('click', showHelp);
    document.getElementById('printBtn').addEventListener('click', printPage);
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
    
    // Modal
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.querySelector('.modal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    // Gestion des onglets clavier
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Gestion de l'inactivité
    document.addEventListener('mousemove', resetSessionTimer);
    document.addEventListener('keypress', resetSessionTimer);
}

// Gestion de la connexion
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    // Simulation de connexion
    showNotification('Connexion en cours...', 'info');
    
    setTimeout(() => {
        APP_STATE.currentUser = {
            id: 'USR001',
            name: username,
            role: 'Responsable Véhicules',
            badgeNumber: 'PD-7890'
        };
        
        document.getElementById('loginScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('mdtApp').style.display = 'flex';
            setTimeout(() => {
                document.getElementById('mdtApp').style.opacity = '1';
                showNotification('Connexion réussie !', 'success');
                loadUserData();
            }, 50);
        }, 300);
    }, 1000);
}

// Gestion de la déconnexion
function handleLogout() {
    showNotification('Déconnexion en cours...', 'info');
    
    setTimeout(() => {
        document.getElementById('mdtApp').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('mdtApp').style.display = 'none';
            document.getElementById('loginScreen').style.display = 'flex';
            setTimeout(() => {
                document.getElementById('loginScreen').style.opacity = '1';
                resetLoginForm();
                clearSession();
            }, 50);
        }, 300);
    }, 500);
}

// Navigation
function handleNavigation(e) {
    const tab = this.getAttribute('data-tab');
    APP_STATE.currentTab = tab;
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
    
    // Afficher le contenu correspondant
    document.querySelectorAll('.content-body').forEach(body => {
        body.style.display = 'none';
        if (body.id === tab + 'Tab') {
            body.style.display = 'block';
            updateTabContent(tab);
        }
    });
}

// Gestion des données
function loadDemoData() {
    APP_STATE.vehicles = DEMO_DATA.vehicles;
    renderVehiclesTable();
}

function refreshData() {
    showNotification('Actualisation des données...', 'info');
    
    // Simulation de chargement
    setTimeout(() => {
        // Mettre à jour l'heure de dernière mise à jour
        const now = new Date();
        const timeStr = now.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        document.getElementById('lastUpdateTime').textContent = `Aujourd'hui ${timeStr}`;
        
        updateDashboardStats();
        renderVehiclesTable();
        showNotification('Données actualisées', 'success');
    }, 1000);
}

function updateDashboardStats() {
    document.getElementById('totalVehicles').textContent = DEMO_DATA.stats.total;
    document.getElementById('activeVehicles').textContent = DEMO_DATA.stats.active;
    document.getElementById('pendingVehicles').textContent = DEMO_DATA.stats.pending;
    document.getElementById('inactiveVehicles').textContent = DEMO_DATA.stats.inactive;
}

// Gestion du tableau des véhicules
function renderVehiclesTable() {
    const tbody = document.querySelector('.vehicles-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    APP_STATE.vehicles.forEach(vehicle => {
        const row = createVehicleRow(vehicle);
        tbody.appendChild(row);
    });
    
    updateTableCount();
}

function createVehicleRow(vehicle) {
    const row = document.createElement('tr');
    row.className = `vehicle-row ${vehicle.status}`;
    row.dataset.id = vehicle.id;
    
    const date = new Date(vehicle.purchaseDate);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    
    row.innerHTML = `
        <td class="select-cell">
            <input type="checkbox" class="vehicle-select" data-id="${vehicle.id}">
        </td>
        <td class="general-cell">
            <div class="vehicle-info">
                <div class="vehicle-icon">
                    <i class="fas fa-${getVehicleIcon(vehicle.type)}"></i>
                </div>
                <div class="vehicle-details">
                    <div class="vehicle-name">${vehicle.name}</div>
                    <div class="vehicle-id">${vehicle.id}</div>
                </div>
            </div>
        </td>
        <td class="details-cell">
            <button class="details-btn" data-id="${vehicle.id}">
                <i class="fas fa-chevron-right"></i>
                Voir détails
            </button>
        </td>
        <td class="date-cell">
            <div class="date-badge">
                <i class="fas fa-calendar-alt"></i>
                <span>${formattedDate}</span>
            </div>
        </td>
        <td class="buyer-cell">
            <div class="user-badge">
                <div class="user-avatar small">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-name">${vehicle.buyer.name}</div>
            </div>
        </td>
        <td class="seller-cell">
            <div class="user-badge">
                <div class="user-avatar small">
                    <i class="fas fa-user-tie"></i>
                </div>
                <div class="user-name">${vehicle.seller.name}</div>
            </div>
        </td>
        <td class="status-cell">
            <span class="status-badge ${vehicle.status}">
                <i class="fas fa-${getStatusIcon(vehicle.status)}"></i>
                ${getStatusText(vehicle.status)}
            </span>
        </td>
        <td class="actions-cell">
            <div class="action-buttons">
                <button class="action-btn view" title="Voir détails" data-id="${vehicle.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" title="Éditer" data-id="${vehicle.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" title="Supprimer" data-id="${vehicle.id}">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="action-btn more" title="Plus d'options" data-id="${vehicle.id}">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </td>
    `;
    
    // Ajouter les événements
    row.querySelector('.details-btn').addEventListener('click', viewVehicleDetails);
    row.querySelector('.action-btn.view').addEventListener('click', viewVehicleDetails);
    row.querySelector('.action-btn.edit').addEventListener('click', editVehicle);
    row.querySelector('.action-btn.delete').addEventListener('click', deleteVehicle);
    row.querySelector('.vehicle-select').addEventListener('change', handleVehicleSelect);
    
    return row;
}

// Filtrage et recherche
function filterVehicles() {
    const status = document.getElementById('statusFilter').value;
    let filteredVehicles = DEMO_DATA.vehicles;
    
    if (status !== 'all') {
        filteredVehicles = filteredVehicles.filter(v => v.status === status);
    }
    
    renderFilteredVehicles(filteredVehicles);
}

function searchVehicles() {
    const query = document.getElementById('vehicleSearch').value.toLowerCase();
    
    if (!query) {
        renderVehiclesTable();
        return;
    }
    
    const filteredVehicles = DEMO_DATA.vehicles.filter(vehicle => 
        vehicle.name.toLowerCase().includes(query) ||
        vehicle.id.toLowerCase().includes(query) ||
        vehicle.buyer.name.toLowerCase().includes(query) ||
        vehicle.seller.name.toLowerCase().includes(query)
    );
    
    renderFilteredVehicles(filteredVehicles);
}

function sortVehicles() {
    const sortBy = document.getElementById('sortFilter').value;
    let sortedVehicles = [...APP_STATE.vehicles];
    
    switch(sortBy) {
        case 'date-desc':
            sortedVehicles.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
            break;
        case 'date-asc':
            sortedVehicles.sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
            break;
        case 'name-asc':
            sortedVehicles.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    APP_STATE.vehicles = sortedVehicles;
    renderVehiclesTable();
}

function renderFilteredVehicles(vehicles) {
    const tbody = document.querySelector('.vehicles-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    vehicles.forEach(vehicle => {
        const row = createVehicleRow(vehicle);
        tbody.appendChild(row);
    });
    
    updateTableCount(vehicles.length);
}

// Gestion de la sélection
function handleSelectAll(e) {
    const isChecked = e.target.checked;
    const checkboxes = document.querySelectorAll('.vehicle-select');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        const vehicleId = checkbox.dataset.id;
        
        if (isChecked) {
            APP_STATE.selectedVehicles.add(vehicleId);
        } else {
            APP_STATE.selectedVehicles.delete(vehicleId);
        }
    });
    
    updateSelectionActions();
}

function handleVehicleSelect(e) {
    const checkbox = e.target;
    const vehicleId = checkbox.dataset.id;
    
    if (checkbox.checked) {
        APP_STATE.selectedVehicles.add(vehicleId);
    } else {
        APP_STATE.selectedVehicles.delete(vehicleId);
        document.getElementById('selectAll').checked = false;
    }
    
    updateSelectionActions();
}

// Actions sur les véhicules
function viewVehicleDetails(e) {
    const vehicleId = e.target.closest('button').dataset.id;
    const vehicle = APP_STATE.vehicles.find(v => v.id === vehicleId);
    
    if (vehicle) {
        showVehicleDetailsModal(vehicle);
    }
}

function editVehicle(e) {
    const vehicleId = e.target.closest('button').dataset.id;
    const vehicle = APP_STATE.vehicles.find(v => v.id === vehicleId);
    
    if (vehicle) {
        showEditVehicleModal(vehicle);
    }
}

function deleteVehicle(e) {
    const vehicleId = e.target.closest('button').dataset.id;
    const vehicle = APP_STATE.vehicles.find(v => v.id === vehicleId);
    
    if (!vehicle) return;
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer le véhicule "${vehicle.name}" (${vehicle.id}) ?`)) {
        // Simulation de suppression
        showNotification('Suppression du véhicule...', 'warning');
        
        setTimeout(() => {
            const index = APP_STATE.vehicles.findIndex(v => v.id === vehicleId);
            if (index > -1) {
                APP_STATE.vehicles.splice(index, 1);
                renderVehiclesTable();
                updateDashboardStats();
                showNotification('Véhicule supprimé avec succès', 'success');
            }
        }, 1000);
    }
}

// Modal d'ajout de véhicule
function showAddVehicleModal() {
    const modal = document.getElementById('addVehicleModal');
    modal.querySelector('.modal-body').innerHTML = createVehicleForm();
    modal.style.display = 'flex';
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
    
    // Ajouter les événements du formulaire
    const form = modal.querySelector('#vehicleForm');
    if (form) {
        form.addEventListener('submit', handleAddVehicleSubmit);
    }
}

function closeModal() {
    const modal = document.getElementById('addVehicleModal');
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function handleAddVehicleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const vehicleData = {
        id: `VH-${new Date().getFullYear()}-${String(APP_STATE.vehicles.length + 1).padStart(3, '0')}`,
        name: formData.get('name'),
        type: formData.get('type'),
        status: 'pending',
        purchaseDate: formData.get('purchaseDate') || new Date().toISOString().split('T')[0],
        buyer: {
            name: formData.get('buyerName'),
            role: formData.get('buyerRole')
        },
        seller: {
            name: formData.get('sellerName'),
            role: formData.get('sellerRole')
        },
        price: parseFloat(formData.get('price')),
        details: {
            model: formData.get('model'),
            year: parseInt(formData.get('year')),
            engine: formData.get('engine')
        }
    };
    
    // Simulation d'ajout
    showNotification('Ajout du véhicule en cours...', 'info');
    
    setTimeout(() => {
        APP_STATE.vehicles.unshift(vehicleData);
        renderVehiclesTable();
        updateDashboardStats();
        closeModal();
        showNotification('Véhicule ajouté avec succès', 'success');
        
        // Naviguer vers l'onglet véhicules
        document.querySelector('[data-tab="vehicles"]').click();
    }, 1500);
}

// Utilitaires
function updateTabContent(tab) {
    switch(tab) {
        case 'dashboard':
            updateDashboardStats();
            break;
        case 'vehicles':
            renderVehiclesTable();
            break;
    }
}

function updateTableCount(count = APP_STATE.vehicles.length) {
    const countElement = document.querySelector('.table-count');
    if (countElement) {
        countElement.textContent = `${count} véhicule${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`;
    }
}

function updateSelectionActions() {
    const selectedCount = APP_STATE.selectedVehicles.size;
    // Ici, vous pourriez activer/désactiver des boutons d'actions groupées
}

// Gestion du temps
function updateCurrentTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeStr;
    }
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Fermeture automatique
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Fermeture manuelle
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Fonctions d'aide
function getVehicleIcon(type) {
    const icons = {
        'admin': 'home',
        'personnel': 'users',
        'public': 'user-friends',
        'training': 'graduation-cap',
        'registry': 'book'
    };
    return icons[type] || 'car';
}

function getStatusIcon(status) {
    const icons = {
        'active': 'check-circle',
        'pending': 'clock',
        'inactive': 'times-circle'
    };
    return icons[status] || 'circle';
}

function getStatusText(status) {
    const texts = {
        'active': 'Actif',
        'pending': 'En attente',
        'inactive': 'Inactif'
    };
    return texts[status] || status;
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Gestion de session
function startSessionTimer() {
    APP_STATE.sessionTimer = setTimeout(() => {
        showNotification('Session expirée. Déconnexion automatique...', 'warning');
        setTimeout(handleLogout, 3000);
    }, CONFIG.SESSION_TIMEOUT);
}

function resetSessionTimer() {
    clearTimeout(APP_STATE.sessionTimer);
    startSessionTimer();
}

function clearSession() {
    APP_STATE.currentUser = null;
    APP_STATE.selectedVehicles.clear();
    clearTimeout(APP_STATE.sessionTimer);
}

// Fonctions de création de formulaire
function createVehicleForm() {
    return `
        <form id="vehicleForm" class="vehicle-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="name">
                        <i class="fas fa-car"></i>
                        Nom du véhicule *
                    </label>
                    <input type="text" id="name" name="name" required 
                           placeholder="Ex: Véhicule de patrouille">
                </div>
                
                <div class="form-group">
                    <label for="type">
                        <i class="fas fa-tag"></i>
                        Type *
                    </label>
                    <select id="type" name="type" required>
                        <option value="">Sélectionner un type</option>
                        <option value="admin">Administratif</option>
                        <option value="personnel">Personnel</option>
                        <option value="public">Service public</option>
                        <option value="training">Entraînement</option>
                        <option value="registry">Registre</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="model">
                        <i class="fas fa-cog"></i>
                        Modèle *
                    </label>
                    <input type="text" id="model" name="model" required 
                           placeholder="Ex: Ford Explorer Police Interceptor">
                </div>
                
                <div class="form-group">
                    <label for="year">
                        <i class="fas fa-calendar"></i>
                        Année *
                    </label>
                    <input type="number" id="year" name="year" min="2010" 
                           max="2025" value="2024" required>
                </div>
                
                <div class="form-group">
                    <label for="engine">
                        <i class="fas fa-gas-pump"></i>
                        Moteur *
                    </label>
                    <select id="engine" name="engine" required>
                        <option value="essence">Essence</option>
                        <option value="diesel">Diesel</option>
                        <option value="hybride">Hybride</option>
                        <option value="electrique">Électrique</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="price">
                        <i class="fas fa-euro-sign"></i>
                        Prix (€) *
                    </label>
                    <input type="number" id="price" name="price" min="0" 
                           step="100" placeholder="45000" required>
                </div>
                
                <div class="form-group">
                    <label for="purchaseDate">
                        <i class="fas fa-calendar-alt"></i>
                        Date d'achat *
                    </label>
                    <input type="date" id="purchaseDate" name="purchaseDate" 
                           value="${new Date().toISOString().split('T')[0]}" required>
                </div>
            </div>
            
            <div class="form-section">
                <h4><i class="fas fa-user"></i> Informations de l'acheteur</h4>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="buyerName" required 
                               placeholder="Nom de l'acheteur">
                    </div>
                    <div class="form-group">
                        <input type="text" name="buyerRole" required 
                               placeholder="Rôle/Fonction">
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h4><i class="fas fa-user-tie"></i> Informations du vendeur</h4>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" name="sellerName" required 
                               placeholder="Nom du vendeur">
                    </div>
                    <div class="form-group">
                        <input type="text" name="sellerRole" required 
                               placeholder="Rôle/Société">
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    Annuler
                </button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i>
                    Enregistrer le véhicule
                </button>
            </div>
        </form>
    `;
}

// Autres fonctions
function generateQuickReport() {
    showNotification('Génération du rapport en cours...', 'info');
    
    setTimeout(() => {
        const data = {
            generatedAt: new Date().toISOString(),
            totalVehicles: APP_STATE.vehicles.length,
            activeVehicles: APP_STATE.vehicles.filter(v => v.status === 'active').length,
            pendingVehicles: APP_STATE.vehicles.filter(v => v.status === 'pending').length,
            vehicles: APP_STATE.vehicles
        };
        
        // Simulation de téléchargement
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapport-vehicules-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Rapport généré avec succès', 'success');
    }, 2000);
}

function showAdvancedSearch() {
    // Implémentation de la recherche avancée
    alert('Recherche avancée - Fonctionnalité à venir');
}

function showAnalytics() {
    // Implémentation des analytics
    alert('Analytique - Fonctionnalité à venir');
}

function showHelp() {
    alert('Aide MDT Police\n\n1. Navigation : Utilisez la barre latérale pour naviguer\n2. Véhicules : Ajoutez, modifiez ou supprimez des véhicules\n3. Recherche : Utilisez la barre de recherche pour filtrer\n4. Rapports : Générez des rapports PDF/JSON\n\nPour plus d\'aide, contactez le support technique.');
}

function printPage() {
    window.print();
}

function toggleFullscreen() {
    const elem = document.documentElement;
    
    if (!APP_STATE.isFullscreen) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        APP_STATE.isFullscreen = true;
        showNotification('Mode plein écran activé', 'info');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        APP_STATE.isFullscreen = false;
        showNotification('Mode plein écran désactivé', 'info');
    }
}

function handleKeyboardShortcuts(e) {
    // Ctrl + N : Nouveau véhicule
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        showAddVehicleModal();
    }
    
    // Ctrl + F : Recherche
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('vehicleSearch').focus();
    }
    
    // Ctrl + R : Actualiser
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        refreshData();
    }
    
    // Échap : Fermer modals
    if (e.key === 'Escape') {
        closeModal();
    }
}

function loadUserData() {
    // Simulation de chargement des données utilisateur
    if (APP_STATE.currentUser) {
        document.querySelector('.user-name').textContent = APP_STATE.currentUser.name;
        document.querySelector('.user-role').textContent = APP_STATE.currentUser.role;
    }
}

function resetLoginForm() {
    document.getElementById('username').value = 'agent.police';
    document.getElementById('password').value = '••••••••';
}

function setupRealTimeUpdates() {
    setInterval(updateCurrentTime, 1000);
    
    // Simulation de mises à jour en temps réel
    setInterval(() => {
        if (APP_STATE.currentTab === 'dashboard') {
            updateCurrentTime();
        }
    }, CONFIG.UPDATE_INTERVAL);
}

// Exporter les fonctions nécessaires
window.showAddVehicleModal = showAddVehicleModal;
window.closeModal = closeModal;
window.refreshData = refreshData;

// Démarrer l'application
setInterval(updateCurrentTime, 1000);
updateCurrentTime();
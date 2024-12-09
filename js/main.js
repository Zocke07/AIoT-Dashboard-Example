// Main JavaScript file for general functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any general functionality
    initializeNotifications();
    initializeUserProfile();
});

function initializeNotifications() {
    const notificationBell = document.querySelector('.notifications');
    notificationBell.addEventListener('click', () => {
        // Handle notification click
        console.log('Notifications clicked');
    });
}

function initializeUserProfile() {
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
        // Handle logout
        console.log('Logout clicked');
    });
}

class PanelManager {
    constructor() {
        this.mainContent = document.querySelector('.main-content');
        this.panels = {
            smartlock: document.getElementById('smartlock-panel'),
            environmental: document.getElementById('environmental-panel')
        };
        this.toggleButtons = document.querySelectorAll('.panel-toggle');
        this.setupEventListeners();
        this.initializePanels();
    }

    initializePanels() {
        // Set initial state - both panels visible
        this.toggleButtons.forEach(btn => btn.classList.add('active'));
    }

    setupEventListeners() {
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const panelType = button.dataset.panel;
                this.togglePanel(panelType, button);
            });
        });
    }

    togglePanel(panelType, button) {
        const panel = this.panels[panelType];
        const isHidden = panel.classList.contains('hidden');
        
        // Toggle button state
        button.classList.toggle('active');

        // Toggle panel visibility
        panel.classList.toggle('hidden');

        // Count visible panels
        const visiblePanels = Object.values(this.panels)
            .filter(p => !p.classList.contains('hidden')).length;

        // Adjust layout based on visible panels
        if (visiblePanels === 1) {
            this.mainContent.classList.add('single-panel');
        } else {
            this.mainContent.classList.remove('single-panel');
        }

        // If trying to hide both panels, prevent it and show alert
        if (visiblePanels === 0) {
            button.classList.add('active');
            panel.classList.remove('hidden');
            this.showAlert('At least one panel must remain visible');
        }

        // Trigger resize event to update any charts
        window.dispatchEvent(new Event('resize'));
    }

    showAlert(message) {
        const alertHTML = `
            <div class="panel-alert">
                <div class="alert-content">
                    <i class="fas fa-info-circle"></i>
                    <span>${message}</span>
                </div>
            </div>
        `;

        const alertElement = document.createElement('div');
        alertElement.innerHTML = alertHTML;
        document.body.appendChild(alertElement.firstChild);

        setTimeout(() => {
            document.querySelector('.panel-alert').remove();
        }, 3000);
    }
}

// Initialize panel manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PanelManager();
}); 
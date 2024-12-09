class SmartLockSystem {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.initializeRooms();
    }

    getCurrentUser() {
        return {
            id: 'ADMIN001',
            name: 'System Administrator',
            role: 'admin'
        };
    }

    initializeRooms() {
        const roomsContainer = document.getElementById('smartlock-rooms');
        const detailsContainer = document.getElementById('smartlock-details');
        
        roomsContainer.innerHTML = this.generateRoomCards();
        detailsContainer.style.display = 'none';

        this.attachRoomCardListeners();
    }

    generateRoomCards() {
        const rooms = [
            { id: '101', type: 'Lecture Hall', status: 'locked', floor: '1st Floor' },
            { id: '102', type: 'Laboratory', status: 'locked', floor: '1st Floor' },
            { id: '103', type: 'Classroom', status: 'unlocked', floor: '1st Floor' },
            { id: '104', type: 'Meeting Room', status: 'locked', floor: '1st Floor' },
            { id: '105', type: 'Computer Lab', status: 'unlocked', floor: '1st Floor' },
            { id: '201', type: 'Lecture Hall', status: 'locked', floor: '2nd Floor' },
            { id: '202', type: 'Laboratory', status: 'unlocked', floor: '2nd Floor' },
            { id: '203', type: 'Classroom', status: 'locked', floor: '2nd Floor' },
            { id: '204', type: 'Study Room', status: 'locked', floor: '2nd Floor' },
            { id: '205', type: 'Library', status: 'unlocked', floor: '2nd Floor' },
            { id: '301', type: 'Conference Room', status: 'locked', floor: '3rd Floor' },
            { id: '302', type: 'Research Lab', status: 'locked', floor: '3rd Floor' },
            { id: '303', type: 'Seminar Room', status: 'unlocked', floor: '3rd Floor' }
        ];

        // Group rooms by floor
        const groupedRooms = rooms.reduce((acc, room) => {
            if (!acc[room.floor]) acc[room.floor] = [];
            acc[room.floor].push(room);
            return acc;
        }, {});

        return Object.entries(groupedRooms).map(([floor, rooms]) => `
            <div class="floor-section">
                <h3 class="floor-title">${floor}</h3>
                <div class="room-grid">
                    ${rooms.map(room => `
                        <div class="room-card" data-room="${room.id}">
                            <i class="fas fa-door-closed"></i>
                            <div class="room-info">
                                <h4>Room ${room.id}</h4>
                                <span class="room-type">${room.type}</span>
                            </div>
                            <span class="room-status ${room.status}">
                                <i class="fas fa-${room.status === 'locked' ? 'lock' : 'lock-open'}"></i>
                                ${room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    attachRoomCardListeners() {
        const roomCards = document.querySelectorAll('.room-card');
        roomCards.forEach(card => {
            card.addEventListener('click', () => {
                const roomId = card.dataset.room;
                this.showRoomDetails(roomId);
                
                // Update active states
                roomCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
    }

    showRoomDetails(roomId) {
        const roomsContainer = document.getElementById('smartlock-rooms');
        const detailsContainer = document.getElementById('smartlock-details');

        roomsContainer.style.display = 'none';
        detailsContainer.style.display = 'block';

        detailsContainer.innerHTML = `
            <button class="back-to-rooms">
                <i class="fas fa-arrow-left"></i>
                Back to Rooms List
            </button>
            
            <div class="room-control">
                <h3>Room ${roomId} Control</h3>
                <div class="lock-status">
                    <i class="fas fa-lock"></i>
                    <span>Currently Locked</span>
                </div>
                <div class="lock-buttons">
                    <button class="lock-toggle locked">
                        <i class="fas fa-lock"></i>
                        <span>Locked</span>
                    </button>
                </div>
            </div>

            <div class="access-log">
                <h3>Access Log</h3>
                <div class="log-entries">
                    ${this.generateDetailedLogs(roomId)}
                </div>
            </div>
        `;

        this.setupBackButton();
        this.setupLockControls();
    }

    setupBackButton() {
        const backButton = document.querySelector('.back-to-rooms');
        const roomsContainer = document.getElementById('smartlock-rooms');
        const detailsContainer = document.getElementById('smartlock-details');

        backButton.addEventListener('click', () => {
            detailsContainer.style.display = 'none';
            roomsContainer.style.display = 'block';
            document.querySelectorAll('.room-card').forEach(card => 
                card.classList.remove('active'));
        });
    }

    setupLockControls() {
        const lockToggle = document.querySelector('.lock-toggle');
        if (lockToggle) {
            lockToggle.addEventListener('click', () => {
                const isLocked = lockToggle.classList.contains('locked');
                lockToggle.classList.toggle('locked');
                lockToggle.classList.toggle('unlocked');
                
                if (isLocked) {
                    lockToggle.innerHTML = '<i class="fas fa-lock-open"></i> <span>Unlocked</span>';
                } else {
                    lockToggle.innerHTML = '<i class="fas fa-lock"></i> <span>Locked</span>';
                }

                // Update lock status display
                const lockStatus = document.querySelector('.lock-status');
                lockStatus.innerHTML = `
                    <i class="fas fa-${isLocked ? 'lock-open' : 'lock'}"></i>
                    <span>Currently ${isLocked ? 'Unlocked' : 'Locked'}</span>
                `;
            });
        }
    }

    generateDetailedLogs(roomId) {
        const logs = [
            {
                time: '10:30 AM',
                date: '2024-01-20',
                action: 'Unlocked',
                user: { id: 'PROF001', role: 'professor', name: 'Dr. Smith' },
                status: 'authorized',
                method: 'Card Access',
                description: 'Regular class schedule'
            },
            {
                time: '10:15 AM',
                date: '2024-01-20',
                action: 'Access Denied',
                user: { id: 'STU002', role: 'student', name: 'Jane Smith' },
                status: 'unauthorized',
                method: 'Card Access',
                description: 'Outside of scheduled hours'
            },
            {
                time: '09:45 AM',
                date: '2024-01-20',
                action: 'Emergency Unlock',
                user: { id: 'ADMIN001', role: 'admin', name: 'System Administrator' },
                status: 'authorized',
                method: 'Remote Access',
                description: 'Emergency protocol initiated'
            },
            {
                time: '09:30 AM',
                date: '2024-01-20',
                action: 'Locked',
                user: { id: 'PROF001', role: 'professor', name: 'Dr. Smith' },
                status: 'authorized',
                method: 'Card Access',
                description: 'End of morning session'
            },
            {
                time: '08:00 AM',
                date: '2024-01-20',
                action: 'Unlocked',
                user: { id: 'STAFF001', role: 'staff', name: 'Maintenance Staff' },
                status: 'authorized',
                method: 'Master Key',
                description: 'Regular maintenance check'
            }
        ];

        return logs.map(log => `
            <div class="log-entry ${log.status}">
                <div class="log-user">
                    <span class="user-role ${log.user.role}">
                        ${log.user.role.charAt(0).toUpperCase() + log.user.role.slice(1)}
                    </span>
                </div>
                <div class="log-details">
                    <div class="log-action-details">
                        <span class="log-action ${log.action.toLowerCase().replace(' ', '-')}">
                            ${log.action}
                        </span>
                        <span class="user-name">${log.user.name}</span>
                        <span class="user-id">(${log.user.id})</span>
                    </div>
                    <span class="log-description">
                        ${log.method} - ${log.description}
                    </span>
                </div>
                <div class="log-timestamp">
                    <div>${log.time}</div>
                    <div>${log.date}</div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize the system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.smartLockSystem = new SmartLockSystem();
}); 
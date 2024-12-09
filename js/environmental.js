class EnvironmentalMonitoring {
    constructor() {
        this.initializeRooms();
        this.setupEventListeners();
    }

    initializeRooms() {
        const roomsContainer = document.getElementById('environmental-rooms');
        roomsContainer.innerHTML = `
            <div class="room-grid">
                ${this.generateRoomCards()}
            </div>
        `;
    }

    generateRoomCards() {
        const rooms = [
            { id: '101', type: 'Lecture Hall', temp: '23°C', humidity: '45%', co2: '400ppm', floor: '1st Floor' },
            { id: '102', type: 'Laboratory', temp: '22°C', humidity: '40%', co2: '450ppm', floor: '1st Floor' },
            { id: '103', type: 'Classroom', temp: '24°C', humidity: '48%', co2: '380ppm', floor: '1st Floor' },
            { id: '104', type: 'Meeting Room', temp: '23°C', humidity: '42%', co2: '420ppm', floor: '1st Floor' },
            { id: '105', type: 'Computer Lab', temp: '21°C', humidity: '44%', co2: '440ppm', floor: '1st Floor' },
            { id: '201', type: 'Lecture Hall', temp: '22°C', humidity: '46%', co2: '410ppm', floor: '2nd Floor' },
            { id: '202', type: 'Laboratory', temp: '23°C', humidity: '41%', co2: '430ppm', floor: '2nd Floor' },
            { id: '203', type: 'Classroom', temp: '24°C', humidity: '43%', co2: '390ppm', floor: '2nd Floor' },
            { id: '204', type: 'Study Room', temp: '22°C', humidity: '45%', co2: '400ppm', floor: '2nd Floor' },
            { id: '205', type: 'Library', temp: '21°C', humidity: '47%', co2: '380ppm', floor: '2nd Floor' },
            { id: '301', type: 'Conference Room', temp: '23°C', humidity: '44%', co2: '410ppm', floor: '3rd Floor' },
            { id: '302', type: 'Research Lab', temp: '22°C', humidity: '42%', co2: '440ppm', floor: '3rd Floor' },
            { id: '303', type: 'Seminar Room', temp: '24°C', humidity: '45%', co2: '400ppm', floor: '3rd Floor' }
        ];

        // Group rooms by floor
        return `
            ${Object.entries(rooms.reduce((acc, room) => {
                if (!acc[room.floor]) acc[room.floor] = [];
                acc[room.floor].push(room);
                return acc;
            }, {})).map(([floor, floorRooms]) => `
                <div class="floor-section">
                    <h3 class="floor-title">${floor}</h3>
                    <div class="room-grid">
                        ${floorRooms.map(room => `
                            <div class="room-card" data-room="${room.id}">
                                <i class="fas fa-thermometer-half"></i>
                                <h4>Room ${room.id}</h4>
                                <span class="room-type">${room.type}</span>
                                <div class="env-quick-stats">
                                    <span title="Temperature"><i class="fas fa-temperature-high"></i> ${room.temp}</span>
                                    <span title="Humidity"><i class="fas fa-tint"></i> ${room.humidity}</span>
                                    <span title="CO₂"><i class="fas fa-wind"></i> ${room.co2}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    }

    showRoomDetails(roomId) {
        const roomsContainer = document.getElementById('environmental-rooms');
        const detailsContainer = document.getElementById('environmental-details');

        // Update display
        roomsContainer.style.display = 'none';
        detailsContainer.style.display = 'block';

        detailsContainer.innerHTML = `
            <button class="back-to-rooms">
                <i class="fas fa-arrow-left"></i>
                Back to Rooms List
            </button>

            <div class="env-monitoring">
                <h3>Room ${roomId} Environment</h3>
                <div class="env-stats">
                    <div class="env-card">
                        <h4><i class="fas fa-temperature-high"></i> Temperature</h4>
                        <div class="env-value">23°C</div>
                        <div class="env-trend">
                            <i class="fas fa-arrow-up"></i> +1°C/hr
                        </div>
                    </div>
                    <div class="env-card">
                        <h4><i class="fas fa-tint"></i> Humidity</h4>
                        <div class="env-value">45%</div>
                        <div class="env-trend">
                            <i class="fas fa-arrow-down"></i> -2%/hr
                        </div>
                    </div>
                    <div class="env-card">
                        <h4><i class="fas fa-wind"></i> CO₂ Levels</h4>
                        <div class="env-value">400ppm</div>
                        <div class="env-trend">
                            <i class="fas fa-equals"></i> Stable
                        </div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="environmentChart-${roomId}"></canvas>
                </div>
                <div class="env-controls">
                    <div class="control-card ac-card">
                        <h4><i class="fas fa-snowflake"></i> AC Control</h4>
                        <div class="temp-indicator">
                            <div class="temp-scale">
                                <span>18°C</span>
                                <span>22°C</span>
                                <span>26°C</span>
                            </div>
                            <div class="indicator-bar">
                                <div class="indicator-fill" style="width: 60%"></div>
                            </div>
                        </div>

                        <div class="temp-control">
                            <button class="temp-adjust" data-temp="down">
                                <i class="fas fa-minus"></i>
                            </button>
                            <div class="current-temp-display">
                                <span class="temp-number">23</span>
                                <span class="temp-unit">°C</span>
                            </div>
                            <button class="temp-adjust" data-temp="up">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>

                        <div class="ac-modes">
                            <button class="mode-btn active" data-mode="cool">
                                <i class="fas fa-snowflake"></i>
                                Cool
                                <span class="mode-desc">Cooling Mode</span>
                            </button>
                            <button class="mode-btn" data-mode="fan">
                                <i class="fas fa-fan"></i>
                                Fan
                                <span class="mode-desc">Air Circulation</span>
                            </button>
                            <button class="mode-btn" data-mode="off">
                                <i class="fas fa-power-off"></i>
                                Off
                                <span class="mode-desc">System Off</span>
                            </button>
                        </div>
                    </div>

                    <div class="control-card ventilation-card">
                        <h4><i class="fas fa-wind"></i> Ventilation Control</h4>
                        <div class="vent-status">
                            <div class="current-level">
                                <span class="level-label">Current Level</span>
                                <span class="level-value">Medium</span>
                            </div>
                            <div class="air-quality">
                                <span class="quality-label">Air Quality</span>
                                <span class="quality-value good">Good</span>
                            </div>
                        </div>
                        <div class="vent-indicator">
                            <div class="indicator-bar">
                                <div class="indicator-fill" style="width: 50%"></div>
                            </div>
                            <div class="indicator-labels">
                                <span>Low</span>
                                <span>Medium</span>
                                <span>High</span>
                            </div>
                        </div>
                        <div class="control-options">
                            <button class="vent-level" data-level="low">
                                <i class="fas fa-leaf"></i>
                                Low
                                <span class="level-desc">Energy Saving</span>
                            </button>
                            <button class="vent-level active" data-level="medium">
                                <i class="fas fa-wind"></i>
                                Medium
                                <span class="level-desc">Balanced</span>
                            </button>
                            <button class="vent-level" data-level="high">
                                <i class="fas fa-fan"></i>
                                High
                                <span class="level-desc">Maximum Flow</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupBackButton();
        this.setupEnvironmentalControls();
        this.initializeCharts(roomId);
    }

    setupBackButton() {
        const backButton = document.querySelector('.back-to-rooms');
        const roomsContainer = document.getElementById('environmental-rooms');
        const detailsContainer = document.getElementById('environmental-details');
    
        backButton.addEventListener('click', () => {
            // Clear the details container before hiding it
            detailsContainer.innerHTML = '';
            detailsContainer.style.display = 'none';
            roomsContainer.style.display = 'block';
            
            // Remove active state from room cards
            document.querySelectorAll('.room-card').forEach(card => 
                card.classList.remove('active'));
                
            // Clean up any charts to prevent memory leaks
            Chart.helpers.each(Chart.instances, (instance) => {
                instance.destroy();
            });
        });
    } 

    setupEventListeners() {
        document.querySelectorAll('#environmental-rooms .room-card').forEach(card => {
            card.addEventListener('click', (e) => {
                document.querySelectorAll('#environmental-rooms .room-card').forEach(c => 
                    c.classList.remove('active'));
                card.classList.add('active');
                this.showRoomDetails(card.dataset.room);
            });
        });
    }

    initializeCharts(roomId) {
        const ctx = document.getElementById(`environmentChart-${roomId}`).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'Temperature (°C)',
                    data: [21, 22, 23, 25, 24, 23],
                    borderColor: '#66bb6a',
                    backgroundColor: 'rgba(102, 187, 106, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Humidity (%)',
                    data: [45, 45, 44, 42, 43, 45],
                    borderColor: '#81c784',
                    backgroundColor: 'rgba(129, 199, 132, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    }
                }
            }
        });
    }

    setupEnvironmentalControls() {
        // Temperature controls
        const tempControls = document.querySelectorAll('.temp-adjust');
        const tempDisplay = document.querySelector('.temp-number');
        const tempIndicator = document.querySelector('.indicator-fill');
        const currentTempValue = document.querySelector('.current-temp-status .temp-value');
        
        tempControls.forEach(control => {
            control.addEventListener('click', (e) => {
                let currentTemp = parseInt(tempDisplay.textContent);
                const isUp = e.currentTarget.dataset.temp === 'up';
                
                // Update temperature
                if (isUp && currentTemp < 26) currentTemp++;
                if (!isUp && currentTemp > 18) currentTemp--;
                
                // Update displays
                tempDisplay.textContent = currentTemp;
                currentTempValue.textContent = `${currentTemp}°C`;
                
                // Calculate and update indicator position
                const percentage = ((currentTemp - 18) / (26 - 18)) * 100;
                tempIndicator.style.width = `${percentage}%`;
                
                // Add animation class
                tempDisplay.classList.add('changing');
                setTimeout(() => tempDisplay.classList.remove('changing'), 300);
            });
        });

        // Mode controls
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                modeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    updateACControl(room) {
        const acSlider = document.getElementById('ac-slider');
        const acValue = document.getElementById('ac-value');
        const acToggle = document.getElementById('ac-toggle');
        
        // Set initial values
        acSlider.value = room.temperature || 24; // Default to 24 if no temperature set
        acValue.textContent = `${acSlider.value}°C`;

        // Update when slider moves
        acSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            acValue.textContent = `${value}°C`;
            room.temperature = parseFloat(value); // Update room temperature
        });

        // Handle AC toggle
        acToggle.addEventListener('change', (e) => {
            const isOn = e.target.checked;
            acSlider.disabled = !isOn; // Disable slider if AC is off
            if (!isOn) {
                acValue.textContent = "OFF";
            } else {
                acValue.textContent = `${acSlider.value}°C`;
            }
        });
    }

    // Optional: Add this method if you need to update backend
    async updateRoomSettings(roomId, settings) {
        try {
            const response = await fetch(`/api/rooms/${roomId}/settings`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings)
            });
            if (!response.ok) throw new Error('Failed to update settings');
        } catch (error) {
            console.error('Error updating room settings:', error);
        }
    }

    updateVentilationControl(room) {
        const ventSlider = document.getElementById('ventilation-slider');
        const ventValue = document.getElementById('ventilation-value');
        
        // Set initial values
        ventSlider.value = room.ventilation || 50; // Default to 50% if no ventilation set
        ventValue.textContent = `${ventSlider.value}%`;

        // Update when slider moves
        ventSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            ventValue.textContent = `${value}%`;
            room.ventilation = parseInt(value); // Update room ventilation
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EnvironmentalMonitoring();
}); 
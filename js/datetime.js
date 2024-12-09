function updateDateTime() {
    const now = new Date();
    document.getElementById('current-datetime').textContent = 
        now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
}

setInterval(updateDateTime, 1000);
updateDateTime(); 
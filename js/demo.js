let demoLogs = [];
let autoClearEnabled = false;

const demoUsers = ["Cad", "Cid", "Cadd", "Cidd"];

function phNow() {
    return new Date(Date.now() + 8 * 60 * 60 * 1000);
}

function updateClock() {
    const iso = phNow().toISOString();
    document.getElementById('currentDate').textContent = iso.substr(0, 10).replace(/-/g, '/');
    document.getElementById('currentTime').textContent = iso.substr(11, 8);
}

function refreshLogs() {
    const logBox = document.getElementById('logBox');
    const totalScans = demoLogs.length;
    let logText = '';

    if (totalScans === 0) {
        logText += 'No attendance records yet.\n';
        logText += 'This is a DEMO. No actual RFID hardware connected.\n';
    } else {
        demoLogs.forEach(function (entry) {
            logText += `${entry.timestamp} - ${entry.name}\n`;
        });
    }

    logBox.textContent = logText;
    logBox.scrollTop = logBox.scrollHeight;

    document.getElementById('totalScans').textContent = totalScans;
    document.getElementById('activeToday').textContent = totalScans > 0 ? Math.min(totalScans, 5) : '-';

    const lastScan = document.getElementById('lastScanData');
    if (totalScans > 0) {
        const last = demoLogs[totalScans - 1];
        lastScan.innerHTML = `<strong>Name:</strong> ${last.name} | <strong>Time:</strong> ${last.timestamp}`;
    } else {
        lastScan.textContent = 'No scans yet';
    }
}

function checkAutoClearStatus() {
    document.getElementById('acBtn').innerText = autoClearEnabled ? '🟢 Auto Clear' : '🔴 Auto Clear';
}

function simulateRFIDScan() {
    const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
    const timestamp = phNow().toISOString().replace('T', ' ').substr(0, 19);

    demoLogs.push({ name: randomUser, timestamp: timestamp });

    const lastScanDiv = document.getElementById('lastScanData');
    lastScanDiv.style.backgroundColor = 'rgba(100, 255, 100, 0.3)';
    setTimeout(function () {
        lastScanDiv.style.backgroundColor = '';
    }, 500);

    refreshLogs();

    if (autoClearEnabled && demoLogs.length > 20) {
        demoLogs = demoLogs.slice(-15);
        alert('Auto-clear triggered! Kept last 15 records.');
        refreshLogs();
    }
}

function simulateDownload() {
    if (demoLogs.length === 0) {
        alert('No data to download!');
        return;
    }

    let csvContent = 'ID,Name,Timestamp\n';
    demoLogs.forEach(function (entry, index) {
        csvContent += `${index + 1},"${entry.name}","${entry.timestamp}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rfid_attendance_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function simulateClearLogs() {
    if (confirm('Clear all demo attendance records?')) {
        demoLogs = [];
        refreshLogs();
        alert('Demo logs cleared!');
    }
}

function toggleAutoClear() {
    autoClearEnabled = !autoClearEnabled;
    checkAutoClearStatus();
    alert(`Auto-clear ${autoClearEnabled ? 'ENABLED' : 'DISABLED'}`);
}

function bindButton(id, handler) {
    document.getElementById(id).addEventListener('click', function (e) {
        e.preventDefault();
        handler();
    });
}

function initializeDemo() {
    for (let i = 0; i < 3; i++) {
        const time = new Date(Date.now() - i * 3600000 + 8 * 60 * 60 * 1000);
        demoLogs.push({
            name: demoUsers[i],
            timestamp: time.toISOString().replace('T', ' ').substr(0, 19)
        });
    }

    bindButton('downloadBtn', simulateDownload);
    bindButton('scanBtn', simulateRFIDScan);
    bindButton('clearBtn', simulateClearLogs);
    bindButton('acBtn', toggleAutoClear);

    updateClock();
    refreshLogs();
    checkAutoClearStatus();

    setInterval(updateClock, 1000);

    setInterval(function () {
        if (Math.random() > 0.7) {
            simulateRFIDScan();
        }
    }, 10000);
}

window.addEventListener('load', initializeDemo);

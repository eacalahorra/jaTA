const { app, BrowserWindow } = require('electron');
const path = require('path');

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: '#0b0c0e',
    show: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.once('ready-to-show', () => win.show());
  win.removeMenu();
  win.loadFile('index.html');
}

app.setAppUserModelId('com.example.jata');

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('second-instance', () => {
  const [win] = BrowserWindow.getAllWindows();
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
//eacalahorra - 2025
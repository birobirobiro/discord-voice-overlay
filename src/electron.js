const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const os = require('os');

const isMacOS = os.type() === 'Darwin';
const isLinux = os.type() === 'Linux';

const htmlPath = path.resolve(__dirname, 'index.html');

function createWindow() {
  const displays = screen.getPrimaryDisplay();

  win = new BrowserWindow({
    x: displays.bounds.width,
    y: 0,
    width: 56,
    icon: null,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    height: displays.bounds.height,
    webPreferences: { nodeIntegration: true },
    transparent: isLinux ? false : true,
    backgroundColor: isLinux ? '#36393F' : undefined,
  });

  win.loadFile(htmlPath);

  if (isMacOS) app.dock.hide();

  // win.webContents.openDevTools({ mode: 'undocked' });
  // win.setVisibleOnAllWorkspaces(true);
  win.on('closed', app.quit);
  console.log('Successfully Opened.');
}

app.whenReady().then(createWindow);

const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const os = require('os');

const isMacOS = os.type() === 'Darwin';

const htmlPath = path.resolve(__dirname, 'index.html');

function createWindow() {
  const displays = screen.getPrimaryDisplay();

  win = new BrowserWindow({
    x: displays.bounds.width,
    y: 0,
    title: 'Teste',
    width: 56,
    height: displays.bounds.height,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    resizable: false,
    icon: null,
    // backgroundColor: '#36393F',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(htmlPath);

  if (isMacOS) app.dock.hide();

  win.webContents.openDevTools({ mode: 'undocked' });
  // win.setVisibleOnAllWorkspaces(true);
  win.on('closed', app.quit);
  console.log('Successfully Opened.');
}

app.whenReady().then(createWindow);

const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');
const os = require('os');

const isMacOS = os.type() === 'Darwin';
const isLinux = os.type() === 'Linux';

const htmlPath = path.resolve(__dirname, 'index.html');

ipcMain.on('close', app.quit);

function createWindow() {
  const displays = screen.getPrimaryDisplay();

  const win = new BrowserWindow({
    x: displays.bounds.width,
    y: 0,
    width: 56,
    icon: null,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    height: displays.workAreaSize.height,
    webPreferences: { nodeIntegration: true },
    transparent: isLinux ? false : true,
    backgroundColor: isLinux ? '#36393F' : undefined,
  });

  win.setIgnoreMouseEvents(true, { forward: true });
  win.loadFile(htmlPath);

  ipcMain.on('on-mouse-enter-close-button', () => {
    win.setIgnoreMouseEvents(false);
  });

  ipcMain.on('on-mouse-leave-close-button', () => {
    win.setIgnoreMouseEvents(true, { forward: true });
  });

  if (isMacOS) app.dock.hide();

  // win.webContents.openDevTools({ mode: 'undocked' });
  // win.setVisibleOnAllWorkspaces(true);
  win.on('closed', app.quit);

  console.log('Successfully Opened.');
}

app.whenReady().then(createWindow);

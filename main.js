const { app, BrowserWindow, Menu, Tray, ipcMain, shell, dialog, Notification } = require('electron');
const path = require('path');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

// Configure logging
log.transports.file.level = 'info';
autoUpdater.logger = log;

let mainWindow;
let tray = null;
let isQuitting = false;

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, focus our window
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();

            // Check for deep link in command line
            const url = commandLine.find(arg => arg.startsWith('hixshares://'));
            if (url) {
                handleDeepLink(url);
            }
        }
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        backgroundColor: '#050508',
        icon: path.join(__dirname, 'logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false
        },
        show: false,
        autoHideMenuBar: true,
        title: 'HixsSharesV5'
    });

    mainWindow.loadFile('index.html');

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        // Check for updates
        if (!process.argv.includes('--dev')) {
            autoUpdater.checkForUpdatesAndNotify();
        }
    });

    // Handle window close
    mainWindow.on('close', (event) => {
        if (!isQuitting) {
            event.preventDefault();
            mainWindow.hide();

            // Show notification on first minimize
            if (Notification.isSupported()) {
                new Notification({
                    title: 'Hixs Shares',
                    body: 'App is still running in the background. Check the system tray.',
                    icon: path.join(__dirname, 'logo.png')
                }).show();
            }
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Open external links in browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Development tools
    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }
}

function createTray() {
    const iconPath = path.join(__dirname, 'logo.png');
    tray = new Tray(iconPath);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: () => {
                if (mainWindow) {
                    mainWindow.show();
                }
            }
        },
        {
            label: 'Send Files',
            click: () => {
                if (mainWindow) {
                    mainWindow.show();
                    mainWindow.webContents.send('switch-mode', 'send');
                }
            }
        },
        {
            label: 'Receive Files',
            click: () => {
                if (mainWindow) {
                    mainWindow.show();
                    mainWindow.webContents.send('switch-mode', 'receive');
                }
            }
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => {
                isQuitting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('HixsSharesV5 - P2P File Transfer');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        if (mainWindow) {
            mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
        }
    });
}

function handleDeepLink(url) {
    // Handle hixshares://room/ABC123 URLs
    const match = url.match(/hixshares:\/\/room\/([A-Z0-9]+)/i);
    if (match && mainWindow) {
        const roomCode = match[1];
        mainWindow.show();
        mainWindow.webContents.send('join-room', roomCode);
    }
}

// App event handlers
app.on('ready', () => {
    createWindow();
    createTray();

    // Register protocol for deep links (hixshares://)
    if (process.defaultApp) {
        if (process.argv.length >= 2) {
            app.setAsDefaultProtocolClient('hixshares', process.execPath, [path.resolve(process.argv[1])]);
        }
    } else {
        app.setAsDefaultProtocolClient('hixshares');
    }
});

app.on('window-all-closed', () => {
    // On macOS, keep app running even when all windows closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    } else {
        mainWindow.show();
    }
});

app.on('before-quit', () => {
    isQuitting = true;
});

// Handle deep links on Windows
app.on('open-url', (event, url) => {
    event.preventDefault();
    handleDeepLink(url);
});

// IPC handlers
ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'multiSelections'],
        title: 'Select files to share'
    });
    return result;
});

ipcMain.handle('select-save-path', async (event, fileName) => {
    const result = await dialog.showSaveDialog(mainWindow, {
        defaultPath: fileName,
        title: 'Save received file'
    });
    return result;
});

ipcMain.on('show-notification', (event, { title, body }) => {
    if (Notification.isSupported()) {
        new Notification({
            title: title || 'Hixs Shares',
            body: body,
            icon: path.join(__dirname, 'logo.png')
        }).show();
    }
});

ipcMain.on('set-progress', (event, progress) => {
    // Progress can be a number between 0 and 1, or -1 to clear
    if (mainWindow) {
        mainWindow.setProgressBar(progress);
    }
});

ipcMain.handle('get-app-path', () => {
    return app.getPath('downloads');
});

// Auto updater events
autoUpdater.on('update-available', () => {
    if (mainWindow) {
        mainWindow.webContents.send('update-available');
    }
});

autoUpdater.on('update-downloaded', () => {
    if (Notification.isSupported()) {
        const notification = new Notification({
            title: 'Update Ready',
            body: 'A new version has been downloaded. Restart to install.',
            icon: path.join(__dirname, 'logo.png')
        });
        notification.on('click', () => {
            autoUpdater.quitAndInstall();
        });
        notification.show();
    }
});

// Error handling
process.on('uncaughtException', (error) => {
    log.error('Uncaught Exception:', error);
});

app.on('render-process-gone', (event, webContents, details) => {
    log.error('Render process gone:', details);
});

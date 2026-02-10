const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // File operations
    selectFile: () => ipcRenderer.invoke('select-file'),
    selectSavePath: (fileName) => ipcRenderer.invoke('select-save-path', fileName),
    getAppPath: () => ipcRenderer.invoke('get-app-path'),

    // Notifications
    showNotification: (data) => ipcRenderer.send('show-notification', data),

    // Progress
    setProgress: (progress) => ipcRenderer.send('set-progress', progress),

    // Events from main process
    onSwitchMode: (callback) => ipcRenderer.on('switch-mode', (event, mode) => callback(mode)),
    onJoinRoom: (callback) => ipcRenderer.on('join-room', (event, code) => callback(code)),
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', () => callback()),

    // Platform detection
    isElectron: true,
    platform: process.platform
});

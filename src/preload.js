// refer: https://stackoverflow.com/questions/52236641/electron-ipc-and-nodeintegration
//        https://github.com/electron/electron/blob/v11.0.0/docs/api/context-bridge.md
import {ipcRenderer, contextBridge } from 'electron';

window.getAppPath = ipcRenderer.send('get-app-path')
contextBridge.exposeInMainWorld('electron', {
    getAppPath: () => {
        ipcRenderer.send('get-app-path')
    }
});

ipcRenderer.on('get-app-path', (event, path) => {
    const message = `This app is located at: ${path}`
    // document.getElementById('got-app-info').innerHTML = message
    console.log(message)
})

console.log("fuck preload")

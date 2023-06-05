'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import path from 'path'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION

            // refer: https://www.electronjs.org/docs/tutorial/context-isolation
            contextIsolation: true,
            webSecurity: false,
            // refer: https://lifesaver.codes/answer/node-integration-is-set-to-false-but-i-need-the-renderer-process-and-the-main-process-communication
            //        https://stackoverflow.com/questions/52236641/electron-ipc-and-nodeintegration
            // Q: In order to simulate the real browser environment, I set nodeIntegration to false, 
            // but I need the renderer process and the main process communication, how can I do it?
            //
            // A: When you spawn your browser window set the preload option to a script you wish to preload:
            // Then in the preload script put in window.ipc = require('ipc'). Do your IPC communication in 
            // the preload.js and have the code interact with your browser window as if it was loaded using 
            // script tags.
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: true
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // try {
        //     await installExtension(VUEJS_DEVTOOLS)
        // } catch (e) {
        //     console.error('Vue Devtools failed to install:', e.toString())
        // }

        // refer: https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/943#issuecomment-756584875
        try {
            await installExtension({
                id: 'ljjemllljcmogpfapbkkighbhhppjdbg', //Vue Devtools beta
                electron: '>=1.2.1'
            })
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

ipcMain.on('get-app-path', (event) => {
    event.sender.send('get-app-path', app.getAppPath())
})

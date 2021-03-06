// refer: https://stackoverflow.com/questions/52236641/electron-ipc-and-nodeintegration
//        https://github.com/electron/electron/blob/v11.0.0/docs/api/context-bridge.md
import { ipcRenderer, contextBridge } from 'electron';
import fs from 'fs'
import path from 'path'
const { exec, execSync } = require("child_process");

contextBridge.exposeInMainWorld('electron', {
    getAppPath: () => {
        ipcRenderer.send('get-app-path')
    },
    getDirEntries: (dir) => {
        let entries = [];
        let files = fs.readdirSync(dir);
        files.forEach(file => {
            if (file.startsWith('$')) {
                return
            }
            let filepath = path.join(dir, file);
            try {
                let stat = fs.statSync(filepath);
                entries.push({
                    name: file,
                    isDir: stat.isDirectory(),
                    mtime: stat.mtime,
                    path: filepath,
                    size: stat.size
                });
            } catch (e) {
                console.error('statSync failed: ', e.toString())
            }

        });
        return entries
    },
    exec: (command) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    },
    execSync: (command) => {
        return execSync(command, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }).toString();
    }
});

ipcRenderer.on('get-app-path', (event, path) => {
    const message = `This app is located at: ${path}`
    // document.getElementById('got-app-info').innerHTML = message
    console.log(message)
})

console.log("fuck preload")
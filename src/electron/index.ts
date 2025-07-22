import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"
import { fileURLToPath, pathToFileURL } from "url"
import { getPreloadScript, isDev } from "./modules/util.js";
import fs from "fs"

export let window: BrowserWindow;
export type IPCRendererController = {
    name: string,
    type: "on" | "handle",
    handle: (...args: unknown[]) => void
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        title: "Negative Manager",
        icon: path.join(__dirname, "../..", "icons", "512.png"),
        webPreferences: {
            preload: getPreloadScript()
        }
    })
    
    if(isDev()) {
        window.loadURL("http://localhost:3000")
    } else {
        window.loadFile(path.join(app.getAppPath(), "/build/index.html"))
    }
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

const ipcFiles = fs.readdirSync(path.join(__dirname, "ipc")).filter(file => file.endsWith(".js"))
for(const file of ipcFiles) {
    const filePath = path.join(__dirname, "ipc", file)
    const fileURL = pathToFileURL(filePath).href
    
    import(fileURL).then((module: { default: IPCRendererController }) => {
        const controller = module.default
        ipcMain[controller.type](controller.name, controller.handle)
    }).catch((error) => {
        console.error(`Failed to load IPC controller ${file}:`, error)
    })
}
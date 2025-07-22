import { app, BrowserWindow, ipcMain, Menu } from "electron"
import path from "path"
import { fileURLToPath, pathToFileURL } from "url"
import { getPreloadScript, isDev } from "./modules/util.js";
import fs from "fs"
import { IPCRendererController } from "./Types.js";
import { FileTemplateElement } from "./modules/menu/file.js";

export let window: BrowserWindow;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createMenu() {
    const template = [
        FileTemplateElement
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

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
    createMenu()
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
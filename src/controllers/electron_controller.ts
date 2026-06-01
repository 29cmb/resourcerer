import { app, BrowserWindow } from 'electron';

export default class ElectronController {
    private entry: string;
    private preload: string;

    constructor(entry: string, preload: string) {
        this.entry = entry
        this.preload = preload

        this.init()
    }

    private init() {
        if (require('electron-squirrel-startup')) {
            app.quit();
        }

        const createWindow = (): void => {
            // Create the browser window.
            const mainWindow = new BrowserWindow({
                height: 600,
                width: 800,
                webPreferences: {
                    preload: this.preload,
                },
            });

            mainWindow.loadURL(this.entry);
        };

        app.on('ready', createWindow);

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    }
}
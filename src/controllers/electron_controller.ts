import { app, BrowserWindow } from 'electron';
import logger from '../util/logger';

export default class ElectronController {
    private entry: string
    private preload: string
    public window!: BrowserWindow

    constructor(entry: string, preload: string) {
        this.entry = entry
        this.preload = preload

        this.init()
        logger.packageRegistration("Initialized ElectronController successfully!")
    }

    private init() {
        if (require('electron-squirrel-startup')) {
            app.quit();
        }

        const createWindow = (): void => {
            this.window = new BrowserWindow({
                height: 600,
                width: 800,
                webPreferences: {
                    preload: this.preload,
                },
            });

            this.window.loadURL(this.entry);
            logger.success("Electron window loaded successfully")
        };

        app.on('ready', () => {
            createWindow()

            this.window.on("close", () => {
                logger.saveLogs()
            })
        });

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
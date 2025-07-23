import { MenuItemConstructorOptions } from "electron";
import { window } from "../../index.js";

export const DebugTemplateElement: MenuItemConstructorOptions = {
    label: "Debug",
    submenu: [
        {
            label: "Toggle Inspect",
            accelerator: "CmdOrCtrl+Shift+I",
            click: () => {
                if (window) {
                    if (window.webContents.isDevToolsOpened()) {
                        window.webContents.closeDevTools();
                    } else {
                        window.webContents.openDevTools();
                    }
                }
            }
        }
    ]
};
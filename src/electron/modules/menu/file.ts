import { app, MenuItemConstructorOptions } from "electron"

export const FileTemplateElement: MenuItemConstructorOptions = {
    label: "File",
    submenu: [
        // Project settings
        {
            label: "New",
            accelerator: "CmdOrCtrl+N",
            click: () => {

            }
        },
        {
            label: 'Open',
            accelerator: 'CmdOrCtrl+O',
            click: () => {
                console.log('Open file clicked')
            }
        },
        { type: 'separator' as const },
        // Export/Import settings
        {
            label: "Import",
            click: () => {

            }
        },
        {
            label: "Export",
            click: () => {

            }
        },
        { type: 'separator' as const },
        {
            label: 'Exit',
            accelerator: 'CmdOrCtrl+Q',
            click: () => {
                app.quit()
            }
        }
    ]
}
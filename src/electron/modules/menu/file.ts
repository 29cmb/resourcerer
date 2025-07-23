import { app, MenuItemConstructorOptions, dialog } from "electron";
import fs from "fs";
import path from "path";
import { MCMeta } from "../../Types.js";
import { window } from "../../index.js";

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
            click: async () => {
                const result = await dialog.showOpenDialog({
                    properties: ['openDirectory']
                });

                if (!result.canceled && result.filePaths.length > 0) {
                    const folderPath = result.filePaths[0];
                    if(!fs.existsSync(path.resolve(folderPath, "pack.mcmeta"))) {
                        dialog.showErrorBox("Pack.mcmeta not found", "Project is not a valid resource pack folder")
                        return
                    }

                    let meta: MCMeta;

                    try {
                        const mcmeta = fs.readFileSync(path.join(folderPath, "pack.mcmeta"), { encoding: "utf8" })
                        meta = JSON.parse(mcmeta)
                    } catch {
                        dialog.showErrorBox("Could not parse project meta", "Your pack.mcmeta may be formatted incorrectly.")
                        return
                    }

                    if(
                        meta.pack === undefined
                        || typeof(meta.pack) !== "object"
                        || meta.pack.description === undefined
                        || typeof(meta.pack.description) !== "string"
                        || meta.pack.pack_format === undefined
                        || typeof(meta.pack.pack_format) !== "number"
                    ) {
                        dialog.showErrorBox("Could not parse project meta", "Your pack.mcmeta is missing required fields. pack_format and description are required for this tool to work")
                        return
                    }

                    const root = fs.readdirSync(folderPath).map(item => {
                        const itemPath = path.join(folderPath, item);
                        const isDirectory = fs.statSync(itemPath).isDirectory();

                        return {
                            name: item,
                            path: itemPath,
                            type: isDirectory ? "directory" : "file"
                        };
                    });

                    const projectData = {
                        name: path.basename(folderPath),
                        description: meta.pack.description,
                        format: meta.pack.pack_format,
                        root
                    }

                    window.webContents.send("open-project", projectData)
                }
            }
        },
        { type: 'separator' as const },
        {
            label: "Save",
            accelerator: "CmdOrCtrl+S",
            click: () => {
                
            }
        },
        { type: 'separator' as const },
        {
            label: 'Exit',
            accelerator: 'CmdOrCtrl+Q',
            click: () => {
                app.quit();
            }
        }
    ]
}
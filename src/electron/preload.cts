import { ProjectData } from "./Types"

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  getVersion: () => ipcRenderer.invoke("version"),
  onProjectLoad: (callback: (data: ProjectData) => void) => ipcRenderer.on("open-project", (_event: any, data: ProjectData) => callback(data)),
  getFolderContents: (path: string) => ipcRenderer.invoke("get-folder-contents", path)
})
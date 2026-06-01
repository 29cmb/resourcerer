import { dialog } from "electron";
import { IPCHandler } from "../Types";

export default class OpenProjectHandler implements IPCHandler<Electron.OpenDialogReturnValue> {
    public id = "open_project"
    public async handle() {
        return await dialog.showOpenDialog({ properties: ["openDirectory", "createDirectory"] })
    }
}
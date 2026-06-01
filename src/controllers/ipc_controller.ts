import { Constructor, IPCEvent, IPCHandler } from "../Types";
import { ipcMain } from "electron";
import OpenProjectHandler from "../ipc/open_project"

export default class IPCController {
    private handlers: Constructor<IPCHandler<any>>[] = [OpenProjectHandler]
    private events: Constructor<IPCEvent>[] = []

    constructor() {
        this.init()
    }

    private init() {
        this.handlers.forEach(handler => {
            const handlerIns = new handler()
            ipcMain.handle(handlerIns.id, handlerIns.handle)
            console.log(`✅ | Registered IPC handler ${handlerIns.id} successfully`)
        })

        this.events.forEach(event => {
            const eventIns = new event()
            ipcMain.on(eventIns.id, eventIns.onEvent)
            console.log(`✅ | Registered IPC event ${eventIns.id} successfully`)
        })
    }
}
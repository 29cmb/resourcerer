import { Event } from "electron"
import fs from "fs"

export default {
    name: "get-file-contents",
    type: "handle",
    handle(_event: Event, filePath: string) {
        return fs.readFileSync(filePath, { encoding: "utf-8" })
    }
}
import { Event } from "electron"
import fs from "fs"
import path from "path"

export default {
    name: "get-folder-contents",
    type: "handle",
    handle(_event: Event, filePath: string) {
        return fs.readdirSync(filePath).map(item => {
            const itemPath = path.join(filePath, item);
            const isDirectory = fs.statSync(itemPath).isDirectory();

            return {
                name: item,
                path: itemPath,
                type: isDirectory ? "directory" : "file"
            };
        });
    }
}
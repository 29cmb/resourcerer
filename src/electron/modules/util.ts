import { app } from "electron"
import path from "path"

export function isDev() {
    return process.env.NODE_ENV === "development"
}

export function getPreloadScript() {
    return path.join(
        app.getAppPath(),
        isDev() ? "." : "..",
        "/build-electron/preload.cjs"
    )
}
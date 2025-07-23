export type IPCRendererController = {
    name: string,
    type: "on" | "handle",
    handle: (...args: unknown[]) => void
}

export type MCMeta = {
    pack: {
        pack_format: number,
        description: string
    }
}

export type ProjectData = {
    name: string,
    description: string,
    format: number,
    root: {
        name: string,
        path: string,
        type: "directory" | "file"
    }[]
}
export type IPCRendererController = {
    name: string,
    type: "on" | "handle",
    handle: (...args: unknown[]) => void
}
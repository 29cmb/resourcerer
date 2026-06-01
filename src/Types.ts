export interface IPCHandler<T> {
    id: string,
    handle(): Promise<T>
}

export interface IPCEvent {
    id: string,
    onEvent(): Promise<void>
}

export interface ResourcererElectronAPI {
    open_project: () => Promise<Electron.OpenDialogReturnValue>
}

export type Constructor<T> = new (...args: any[]) => T;
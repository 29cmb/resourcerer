declare global {
    interface Window {
        electron: {
            getVersion: () => string
        };
    }
}
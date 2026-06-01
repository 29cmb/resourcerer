import ElectronController from "./controllers/electron_controller";
import IPCController from "./controllers/ipc_controller";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const electronController = new ElectronController(MAIN_WINDOW_WEBPACK_ENTRY, MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY)
export const ipcController = new IPCController()
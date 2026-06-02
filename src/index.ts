import ElectronController from "./controllers/electron_controller";
import IPCController from "./controllers/ipc_controller";
import DataController from "./controllers/setup_controller";
import logger from "./util/logger";

logger.booting("Launching resourcerer...")

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const electronController = new ElectronController(MAIN_WINDOW_WEBPACK_ENTRY, MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY)
export const ipcController = new IPCController()
export const dataController = new DataController()

logger.booting("All controllers have initialized!")
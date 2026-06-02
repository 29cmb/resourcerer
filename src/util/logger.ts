import { dataController } from "..";
import { LogLevel } from "../Types";
import misc from "./misc";
import * as path from "path"
import * as fs from "fs"

const messages = {
    [LogLevel.INFO]: '💼 | %s',
    [LogLevel.SUCCESS]: '✅ | %s',
    [LogLevel.PACKAGE_REGISTRATION]: '📦 | %s',
    [LogLevel.WARNING]: '⚠️ | %s',
    [LogLevel.ERROR]: '❌ | %s',
    [LogLevel.DEBUG]: '🛠️ | %s',
    [LogLevel.BOOTING]: '🚀 | %s',
    [LogLevel.ASYNC_TASK]: '⏳ | %s',
    [LogLevel.OTHER]: '%s',
}

const lines: LogEntry[] = []

const log = (message: string, level: LogLevel) => {
    if(message === undefined || message === null) {
        error('Message is undefined or null')
        return;
    }

    const template = messages[level] || messages[LogLevel.OTHER]
    const formattedMessage = template.replace('%s', message)

    lines.push({
        timestamp: misc.formatTime(new Date()),
        text: formattedMessage
    })

    console.log(formattedMessage)
}

const info = (message: string) => log(message, LogLevel.INFO)
const success = (message: string) => log(message, LogLevel.SUCCESS)
const packageRegistration = (message: string) => log(message, LogLevel.PACKAGE_REGISTRATION)
const warning = (message: string) => log(message, LogLevel.WARNING)
const error = (message: string) => log(message, LogLevel.ERROR)
const debug = (message: string) => log(message, LogLevel.DEBUG)
const booting = (message: string) => log(message, LogLevel.BOOTING)
const asyncTask = (message: string) => log(message, LogLevel.ASYNC_TASK)
const other = (message: string) => log(message, LogLevel.OTHER)

const saveLogs = () => {
    const logs = path.join(dataController.userData, "logs")
    const filename = `${new Date().toISOString().replace(/:/g, "-")}.log`;
    fs.writeFileSync(path.join(logs, filename), lines.map(line => (
        `[${line.timestamp}] ${line.text}`
    )).join("\n"), { encoding: "utf-8" })
}

type LogEntry = {
    timestamp: string,
    text: string
}

export default {
    log,
    info,
    success,
    packageRegistration,
    warning,
    error,
    debug,
    booting,
    asyncTask,
    other,

    saveLogs
}
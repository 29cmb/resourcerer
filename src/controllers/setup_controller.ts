import { app } from "electron"
import * as fs from "fs"
import path from "path"
import logger from "../util/logger"

const files: (FileDefinition | FolderDefinition)[] = [
    {
        name: "recents.json",
        type: "file",
        content: "[]",
        validate: (content: string) => {
            let json
            try {
                json = JSON.parse(content)
            } catch(e) {
                return false
            }

            if(!(json instanceof Array)) return false
            return true
        }
    },
    {
        name: "logs",
        type: "folder"
    }
]

export default class DataController {
    public userData = app.getPath("userData")

    constructor() {
        this.init()
        logger.packageRegistration("Initialized DataController successfully!")
    }

    private init() {
        files.forEach(file => {
            this.createDefinition(file)
        })
    }

    private createDefinition(definition: FolderDefinition | FileDefinition, parentPath?: string) {
        let subpath = definition.name
        if(parentPath) {
            subpath = path.join(parentPath, subpath)
        }
        const definitionPath = path.join(this.userData, subpath)

        switch(definition.type) {
            case "file":
                const fileDefinition = definition as FileDefinition
                if(!fs.existsSync(definitionPath)) {
                    fs.writeFileSync(definitionPath, fileDefinition.content, { encoding: "utf-8" })
                    break
                }

                const currentContent = fs.readFileSync(definitionPath, { encoding: "utf-8" })
                if(!fileDefinition.validate(currentContent)) {
                    logger.error(`File ${fileDefinition.name} is invalid, returning to default.`)
                    fs.writeFileSync(definitionPath, fileDefinition.content, { encoding: "utf-8" })
                }
                
                break
            case "folder":
                const folderDefinition = definition as FolderDefinition
                
                if(!fs.existsSync(definitionPath)) {
                    fs.mkdirSync(definitionPath, { recursive: true })
                }

                folderDefinition.children?.forEach(file => this.createDefinition(file, definitionPath))
                break
            default:
                logger.error(`Unknown file type`)
        }
    }
}

type FileDefinition = {
    name: string
    type: "file"
    content: string
    validate: (content: string) => boolean
}

type FolderDefinition = {
    name: string
    type: "folder"
    children?: (FolderDefinition | FileDefinition)[]
}
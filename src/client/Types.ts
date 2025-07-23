declare global {
    interface Window {
        electron: {
            getVersion: () => Promise<string>;
            onProjectLoad: (callback: (data: ProjectData) => void) => void,
            getFolderContents: (path: string) => Promise<FileStructure[]>;
        };
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

export type FileStructure = {
    name: string;
    path: string;
    type: "directory" | "file";
};
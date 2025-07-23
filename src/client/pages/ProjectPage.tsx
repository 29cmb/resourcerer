import { useState } from "react";
import type { ProjectData } from "../Types";
import type { FileStructure } from "../Types";
import { TextEditor } from "../components/TextEditor";

export function ProjectPage({ activeProject }: { activeProject: ProjectData }) {
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
    const [folderContents, setFolderContents] = useState<Record<string, FileStructure[]>>({});
    // Record is <path, newcontent>
    // @devcmb Don't forget
    const [changes, setChanges] = useState<Record<string, string>>({})
    const [editingFile, setEditingFile] = useState<FileStructure | null>(null)

    const toggleFolder = async (path: string) => {
        setExpandedFolders(prev => ({
            ...prev,
            [path]: !prev[path]
        }));

        if (!folderContents[path]) {
            const contents = await window.electron.getFolderContents(path);
            setFolderContents(prev => ({
                ...prev,
                [path]: contents
            }));
        }
    };

    const renderStructure = (items: FileStructure[]) => {
        const sortedItems = [...items].sort((a, b) => {
            if (a.type === "directory" && b.type !== "directory") return -1;
            if (a.type !== "directory" && b.type === "directory") return 1;
            return a.name.localeCompare(b.name);
        });

        return sortedItems.map(item => (
            // So github copilot hallucinated this line when I attempted to have it fix the "child elements get parent element hover effect" bug, but this looks pretty cool
            // im using it now!!!
            <li key={item.path} className="pl-[10px] whitespace-nowrap hover:bg-[rgba(255,255,255,0.1)] min-w-max">
                {item.type === "directory" ? (
                    <>
                        <span onClick={() => toggleFolder(item.path)}>
                            {expandedFolders[item.path] ? "📂" : "📁"} {item.name}
                        </span>
                        {expandedFolders[item.path] && (
                            <ul className="pl-[10px]">
                                {renderStructure(folderContents[item.path] || [])}
                            </ul>
                        )}
                    </>
                ) : (
                    <>
                        <span onClick={async () => {
                            const content = await window.electron.getFileContents(item.path)
                            setChanges((prev) => ({
                                ...prev,
                                [item.path]: content
                            }))

                            setEditingFile(item)
                        }}>{"📄"} {item.name}</span>
                    </>
                )}
            </li>
        ));
    };

    const getFileExtension = (filePath: string): string => {
        const parts = filePath.split(".");
        return parts.length > 1 ? parts.pop() || "" : "";
    };

    return <>
        <div className="w-[20em] h-[100vh] bg-[rgb(19,19,19)] overflow-y-auto">
            <p className="p-[10px] font-bold">{activeProject.name}</p>
            <ul className="p-[10px]">
                {renderStructure(activeProject.root)}
            </ul>
        </div>
        {editingFile !== null && <div className="absolute h-[100vh] w-[calc(100%-20em)] top-0 left-[20em]">
            <TextEditor file={editingFile.path} content={changes[editingFile.path]} change={(newContent: string) => {
                setChanges((prev) => ({
                    ...prev,
                    [editingFile.path]: newContent
                }))
            }}/>
        </div>}
    </>
}
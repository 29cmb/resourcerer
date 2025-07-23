import { useState } from "react";
import type { ProjectData } from "../Types";
import type { FileStructure } from "../Types";

export function ProjectPage({ activeProject }: { activeProject: ProjectData }) {
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
    const [folderContents, setFolderContents] = useState<Record<string, FileStructure[]>>({});

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
        return items.map(item => (
            <li key={item.path} className="pl-[10px] whitespace-nowrap">
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
                    <>{"📄"} {item.name}</>
                )}
            </li>
        ));
    };

    return <>
        <div className="w-[20em] h-[100vh] bg-[rgb(19,19,19)] overflow-y-auto">
            <p className="p-[10px] font-bold">{activeProject.name}</p>
            <ul className="p-[10px]">
                {renderStructure(activeProject.root)}
            </ul>
        </div>
    </>
}
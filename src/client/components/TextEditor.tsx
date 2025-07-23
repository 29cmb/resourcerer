import { Editor } from "@monaco-editor/react";
import { useEffect, useRef } from "react";

export function TextEditor({ file, content, change }: { file: string, content: string, change: (newContent: string) => void }) {
    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setValue(content);
        }
    }, [file]);

    const handleEditorMount = (editor: { updateOptions: (arg0: { fontSize: number; theme: string; unicodeHighlight: { nonBasicASCII: boolean; }; }) => void; onDidChangeModelContent: (arg0: () => void) => void; getValue: () => any; }) => {
        editorRef.current = editor;
        editor.updateOptions({
            fontSize: 16,
            theme: "vs-dark",
            unicodeHighlight: { nonBasicASCII: false },
        });

        editor.onDidChangeModelContent(() => {
            change(editor.getValue());
        });
    };

    return (
        <Editor
            height="100%"
            defaultLanguage="json"
            defaultValue={content}
            onMount={handleEditorMount}
        />
    );
}
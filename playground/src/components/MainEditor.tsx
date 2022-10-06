import Editor from "@monaco-editor/react"
import { BasicProps } from "./Toolbar"

export interface MainEditorProps {
    template: string;
    transpiled: string;
    setIsEditorReady: (v: boolean) => void;
}

export const MainEditor = ({
    template,
    transpiled,
    showAdvancedTemplate,
    isDarkTheme,
    language,
    sourceEditorRef,
    templateEditorRef,
    setIsEditorReady
}: MainEditorProps & BasicProps) => {

    const didMountSource = (editor: any): void => {
        sourceEditorRef.current = editor;
        setIsEditorReady(true);
    }

    /**
     * Disable editor errors to "handle" ejs syntax
     * @param monaco 
     */
    const handleEditorWillMount = (monaco: any): void => {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            diagnosticCodesToIgnore: [1109, 1005, 1127, 1435, 1068, 1136]
        });
    }

    const didMountTemplate = (editor: any, monaco: any) => {
        templateEditorRef.current = editor;
    }

    return (
        <div className="main-container">
            <div className="page-container">
                {
                    <>
                        <div className={`editor-container ${showAdvancedTemplate ? "" : "d-none"}`}>
                            <div className="editor-title">Template</div>
                            <Editor
                                width="33vw"
                                theme={isDarkTheme ? "vs-dark" : "vs-light"}
                                language="javascript"
                                value={template}
                                loading={"Loading..."}
                                onMount={didMountTemplate}
                                beforeMount={handleEditorWillMount}
                            />
                        </div>
                    </>
                }
            </div>
            <div className="page-container">
                <div className="editor-container">
                    <div className="editor-title">Source code (*.ts)</div>
                    <Editor
                        className="editor-divider"
                        width={showAdvancedTemplate ? "33vw" : "50vw"}
                        theme={isDarkTheme ? "vs-dark" : "vs-light"}
                        language="typescript"
                        value="// input code"
                        loading={"Loading..."}
                        onMount={didMountSource}
                    />
                </div>
                <div className="editor-container">
                    <div className="editor-title">Target code</div>
                    <Editor
                        width={showAdvancedTemplate ? "33vw" : "50vw"}
                        theme={isDarkTheme ? "vs-dark" : "vs-light"}
                        language={language}
                        value={transpiled}
                        loading={"Loading..."}
                    />
                </div>
            </div>
        </div>
    )
}

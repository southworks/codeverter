import Editor from "@monaco-editor/react";
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { compileTypeScriptCode, StringWritter, AvailableLanguages, languageMap, printFileEx, TemplateHelpers } from "@southworks/codeverter";
import "./App.css";

function App() {
    const sourceEditorRef = useRef(null);
    const templateEditorRef = useRef(null);
    const [theme, setTheme] = useState("vs-light");
    const [template, setTemplate] = useState("");
    const [language, setLanguage] = useState("");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [transpiled, setTranspiled] = useState("// output code");
    const [showAdvancedTemplate, setShowAdvancedTemplate] = useState(false);
    const langOptions = useRef<{ [x in AvailableLanguages]: string }>({
        "csharp": "C#",
        "go": "GO"
    });

    useEffect(() => {
        configLanguage("csharp");
    }, []);

    function didMountSource(editor: any): void {
        sourceEditorRef.current = editor;
        setIsEditorReady(true);
    }

    /**
     * Disable editor errors to "handle" ejs syntax
     * @param monaco 
     */
    function handleEditorWillMount(monaco: any): void {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            diagnosticCodesToIgnore: [1109, 1005, 1127, 1435, 1068, 1136]
        });
    }

    function didMountTemplate(editor: any, monaco: any) {
        templateEditorRef.current = editor;
    }

    function changeTheme(e: BaseSyntheticEvent): void {
        setTheme(e.target.value);
    }

    function configLanguage(lang: AvailableLanguages): void {
        const template = new languageMap[lang as AvailableLanguages]();
        setLanguage(lang);

        const helpers = TemplateHelpers.build(template);
        const templateStr = `<% ${TemplateHelpers.toString(helpers)} _%>\r\n${template.getTemplate()}`;

        setTemplate(templateStr);
    }

    function changeLanguage(e: BaseSyntheticEvent): void {
        let change = true;
        if (showAdvancedTemplate) {
            change = window.confirm("The template will be restore as default. Do you want to continue?");
        }
        if (change) {
            const lang = e.target.value;
            configLanguage(lang as AvailableLanguages);
            setTranspiled("//  output code");
        }
    }

    function convertContent(): void {
        const code = (sourceEditorRef.current as any).getValue();
        const tmpl = (templateEditorRef.current as any).getValue();
        if (!!code) {
            const a = compileTypeScriptCode(code, "codeverter.ts");
            const writter = new StringWritter();
            printFileEx(a, tmpl, writter);
            setTranspiled(writter.getString());
        }
    }

    function toggleAdvanced(): void {
        setShowAdvancedTemplate(current => !current);
    }

    return (
        <div className={`app ${theme === "vs-dark" ? "dark-mode" : ""}`}>
            <div className="centered title">
                <a className="centered" href="https://www.southworks.com/" target={"_blank"}>
                    <img src="logo.png" width="212" />
                </a>
                <h1>Codeverter playground</h1>
            </div>
            <div className="toolbar">
                <div>
                    <label htmlFor="lang">Target language</label>
                    <select id="lang" onChange={changeLanguage} value={language}>
                        {Object.keys(langOptions.current).map((k, i) => (
                            <option key={i} value={k}>{langOptions.current[k as AvailableLanguages]}</option>
                        ))}
                    </select>
                    <button className="home-hero-v3-update-link-badge" onClick={toggleAdvanced} disabled={!isEditorReady}>
                        {showAdvancedTemplate ? "Hide" : "Show"} template
                    </button>
                    <button className="home-hero-v3-update-link-badge" onClick={convertContent} disabled={!isEditorReady}>Convert!</button>
                </div>
                <div>
                    <label htmlFor="theme">Theme</label>
                    <select id="theme" onChange={changeTheme}>
                        <option value="vs-light">Light</option>
                        <option value="vs-dark">Dark</option>
                    </select>
                </div>
            </div>
            <hr />
            <div className="main-container">
                <div className="page-container">
                    {
                        <>
                            <div className={`editor-container ${showAdvancedTemplate ? "" : "d-none"}`}>
                                <div className="editor-title">Template</div>
                                <Editor
                                    width="33vw"
                                    theme={theme}
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
                            theme={theme}
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
                            theme={theme}
                            language={language}
                            value={transpiled}
                            loading={"Loading..."}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

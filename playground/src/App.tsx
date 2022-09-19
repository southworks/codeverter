import Editor from "@monaco-editor/react";
import { BaseSyntheticEvent, useRef, useState } from "react";
import { printFile, compileTypeScriptCode, StringWritter, languageMap, AvailableLanguages } from "@southworks/codeverter";
import "./App.css";

function App() {
    const editorRef = useRef(null);
    const [theme, setTheme] = useState("vs-light");
    const [language, setLanguage] = useState("csharp");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [transpiled, setTranspiled] = useState("// output code");

    function handleEditorDidMount(editor: any): void {
        editorRef.current = editor;
        setIsEditorReady(true);
    }

    function changeTheme(e: BaseSyntheticEvent): void {
        setTheme(e.target.value);
    }

    function changeLanguage(e: BaseSyntheticEvent): void {
        setLanguage(e.target.value);
    }

    function convertContent(): void {
        const code = (editorRef.current as any).getValue();
        if (!!code) {
            const a = compileTypeScriptCode(code, "codeverter.ts");
            const writter = new StringWritter();
            const file = new languageMap[language as AvailableLanguages](a);
            printFile(a.sourceFile, writter, file);
            setTranspiled(writter.getString());
        }
    }
    const langOptions: { [x in AvailableLanguages]: string } = {
        "csharp": "C#",
        "go": "GO"
    };

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
                    <label htmlFor="lang">Language</label>
                    <select id="lang" onChange={changeLanguage}>
                        {Object.keys(langOptions).map((k, i) => (
                            <option key={i} value={k}>{langOptions[k as AvailableLanguages]}</option>
                        ))}
                    </select>
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
            <div className="container">
                <Editor
                    className="editor-divider"
                    width="50vw"
                    theme={theme}
                    language="typescript"
                    value="// code to be converted here..."
                    loading={"Loading..."}
                    onMount={handleEditorDidMount}
                />
                <Editor
                    width="50vw"
                    theme={theme}
                    language={language}
                    value={transpiled}
                    loading={"Loading..."}
                />
            </div>
        </div>
    );
}

export default App;

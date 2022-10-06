import { useRef, useState } from "react";
import { AvailableLanguages } from "@southworks/codeverter";
import { BasicProps, Toolbar, ToolbarProps } from "./components/Toolbar";
import { MainEditor, MainEditorProps } from "./components/MainEditor";
import { Header } from "./components/Header";
import "./App.css";

export const App = () => {
    const sourceEditorRef = useRef(null);
    const templateEditorRef = useRef(null);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [template, setTemplate] = useState("");
    const [language, setLanguage] = useState("");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [transpiled, setTranspiled] = useState("// output code");
    const [showAdvancedTemplate, setShowAdvancedTemplate] = useState(false);
    const langOptions = useRef<Partial<{ [x in AvailableLanguages]: string }>>({
        "csharp": "C#",
        "go": "GO"
    });

    const getBasicProps = (): BasicProps => {
        return {
            language,
            isDarkTheme,
            showAdvancedTemplate,
            sourceEditorRef,
            templateEditorRef
        }
    }

    const getToolbarProps = (): ToolbarProps & BasicProps => {
        return {
            isEditorReady,
            langOptions,
            ...getBasicProps(),
            setTranspiled,
            setIsDarkTheme,
            setShowAdvancedTemplate,
            setLanguage,
            setTemplate
        }
    }

    const getEditorProps = (): MainEditorProps & BasicProps => {
        return {
            template,
            transpiled,
            ...getBasicProps(),
            setIsEditorReady
        }
    }

    return (
        <div className={`app ${isDarkTheme ? "dark-mode" : ""}`}>
            <Header />
            <Toolbar {...getToolbarProps()} />
            <hr />
            <MainEditor {...getEditorProps()} />
        </div>
    );
}

export default App;

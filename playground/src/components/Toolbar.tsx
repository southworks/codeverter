import { BaseSyntheticEvent, useEffect } from "react";
import { AvailableLanguages, compileTypeScriptCode, getLanguageGenerator, printFileEx, StringWritter } from "@southworks/codeverter";
import { Switch, FormControlLabel } from "@mui/material";

type LangOptions = React.MutableRefObject<Partial<{
    go: string;
    csharp: string;
    custom: string;
    vb: string
}>>

export interface BasicProps {
    showAdvancedTemplate: boolean;
    isDarkTheme: boolean;
    language: string;
    sourceEditorRef: React.MutableRefObject<null>;
    templateEditorRef: React.MutableRefObject<null>;
}

export interface ToolbarProps {
    showAdvancedTemplate: boolean;
    isEditorReady: boolean;
    langOptions: LangOptions;
    setTranspiled: (t: string) => void;
    setShowAdvancedTemplate: (v: (c: boolean) => boolean) => void;
    setIsDarkTheme: (v: (c: boolean) => boolean) => void;
    setLanguage: (l: string) => void;
    setTemplate: (t: string) => void;
}

export const Toolbar = ({
    language,
    showAdvancedTemplate,
    isDarkTheme,
    isEditorReady,
    langOptions,
    sourceEditorRef,
    templateEditorRef,
    setTranspiled,
    setShowAdvancedTemplate,
    setIsDarkTheme,
    setLanguage,
    setTemplate
}: ToolbarProps & BasicProps) => {

    useEffect(() => {
        configLanguage("csharp");
    }, []);

    const configLanguage = (lang: AvailableLanguages): void => {
        const template = getLanguageGenerator(lang as AvailableLanguages);
        setLanguage(lang);
        setTemplate(template.getTemplate());
    }

    const changeLanguage = (e: BaseSyntheticEvent): void => {
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

    const convertContent = (): void => {
        const code = (sourceEditorRef.current as any).getValue();
        const tmpl = (templateEditorRef.current as any).getValue();
        if (!!code) {
            const a = compileTypeScriptCode(code, "codeverter.ts");
            const writter = new StringWritter();
            printFileEx(a, tmpl, writter);
            setTranspiled(writter.getString());
        }
    }

    const toggleAdvanced = (): void => {
        setShowAdvancedTemplate(current => !current);
    }

    const toggleDarkTheme = (): void => {
        setIsDarkTheme(current => !current);
    }

    return (
        <div className="toolbar">
            <div>
                <label htmlFor="lang">Target language</label>
                <select id="lang" onChange={changeLanguage} value={language}>
                    {Object.keys(langOptions.current).map((k, i) => (
                        <option key={i} value={k}>{langOptions.current[k as AvailableLanguages]}</option>
                    ))}
                </select>
                <FormControlLabel label="Show template" className="template-switch" control={<Switch onChange={toggleAdvanced} checked={showAdvancedTemplate} />} />
                <button className="home-hero-v3-update-link-badge" onClick={convertContent} disabled={!isEditorReady}>Convert!</button>
            </div>
            <FormControlLabel label="Dark mode" className="template-switch" control={<Switch onChange={toggleDarkTheme} checked={isDarkTheme} />} />
        </div>
    )
}

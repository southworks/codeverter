import {
    SourceFile,
    TypeChecker,
    getDefaultCompilerOptions,
    createCompilerHost,
    createSourceFile,
    ScriptTarget,
    CompilerHost,
    createProgram
} from "typescript";

export interface CompilationResult {
    sourceFile: SourceFile,
    typeChecker: TypeChecker
};

export function compileTypeScriptCode(code: string, filename: string): CompilationResult {
    const options = getDefaultCompilerOptions();
    const realHost = createCompilerHost(options, true);

    const dummyFilePath = filename;
    const dummySourceFile = createSourceFile(dummyFilePath, code, ScriptTarget.Latest);
    let outputCode: string | undefined = undefined;

    const host: CompilerHost = {
        fileExists: filePath => filePath === dummyFilePath || realHost.fileExists(filePath),
        directoryExists: realHost.directoryExists && realHost.directoryExists?.bind(realHost),
        getCurrentDirectory: realHost.getCurrentDirectory.bind(realHost),
        getDirectories: realHost.getDirectories?.bind(realHost),
        getCanonicalFileName: fileName => realHost.getCanonicalFileName(fileName),
        getNewLine: realHost.getNewLine.bind(realHost),
        getDefaultLibFileName: realHost.getDefaultLibFileName.bind(realHost),
        getSourceFile: (fileName, languageVersion, onError, shouldCreateNewSourceFile) => fileName === dummyFilePath
            ? dummySourceFile
            : realHost.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile),
        readFile: filePath => filePath === dummyFilePath
            ? code
            : realHost.readFile(filePath),
        useCaseSensitiveFileNames: () => realHost.useCaseSensitiveFileNames(),
        writeFile: (fileName, data) => outputCode = data,
    };

    const program = createProgram([dummyFilePath], options, host);
    return {
        sourceFile: dummySourceFile,
        typeChecker: program.getTypeChecker()
    };
}

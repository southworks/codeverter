/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import {
    SourceFile,
    TypeChecker,
    getDefaultCompilerOptions,
    createSourceFile,
    ScriptTarget,
    CompilerHost,
    createProgram
} from "typescript";

export interface CompilationResult {
    sourceFile: SourceFile,
    typeChecker: TypeChecker
};

/**
 * compile TypeScript code using a mocked compiler host
 * @param code 
 * @param filename 
 * @returns 
 */
export function compileTypeScriptCode(code: string, filename: string): CompilationResult {
    const options = getDefaultCompilerOptions();

    const dummySourceFile = createSourceFile(filename, code, ScriptTarget.Latest);
    let outputCode: string | undefined = undefined;

    const host: CompilerHost = {
        fileExists: _ => true,
        directoryExists: _ => true,
        getCurrentDirectory: () => "",
        getDirectories: _ => [],
        getCanonicalFileName: fileName => fileName,
        getNewLine: () => process?.platform === "win32" ? "\r\n" : "\n",
        getDefaultLibFileName: (_) => filename,
        getSourceFile: _ => dummySourceFile,
        readFile: _ => code,
        useCaseSensitiveFileNames: () => false,
        writeFile: (_, data) => outputCode = data
    };

    const program = createProgram([filename], options, host);
    return {
        sourceFile: dummySourceFile,
        typeChecker: program.getTypeChecker()
    };
}

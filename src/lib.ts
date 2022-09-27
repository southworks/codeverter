/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Writteable } from "./writter/writter";
import { File } from "./shared/file";
import { CompilationResult } from "./shared/helpers/compiler-helper";
import { elementRegistry } from "./element-registry";
import { templateRender } from "./templating/template-render";
import { TemplateGenerator } from "./templating/template-generator";

export { AvailableLanguages, getLanguageGenerator } from "./language-map";
export { compileTypeScriptCode } from "./shared/helpers/compiler-helper";
export { StringWritter } from "./writter/string-writter";
export { CompilationResult, TemplateGenerator };

/**
 * transform a sourcefile to a target language by using a string template and helpers
 * @param compilationResult sourcefile + typeChecker\
 * @param helpers
 * @param template
 * @param writter 
 */
export function printFileEx(
    compilationResult: CompilationResult, template: string, writter: Writteable
): void {
    const file = new File({
        sourceFile: compilationResult.sourceFile,
        typeChecker: compilationResult.typeChecker,
        elementFactory: elementRegistry
    });
    file.parse(compilationResult.sourceFile);
    const render = templateRender(template, file);
    writter.write(render);
}

/**
 * transform a sourcefile to a target language using a template generator
 * @param compilationResult sourcefile + typeChecker\
 * @param template
 * @param writter
 */
export function printFile(
    compilationResult: CompilationResult, template: TemplateGenerator, writter: Writteable
): void {
    printFileEx(compilationResult, template.getTemplate(), writter);
}

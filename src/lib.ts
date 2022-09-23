/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Writteable } from "./writter/writter";
import { File } from "./shared/file";
import { render } from "ejs";
import { TemplateGenerator } from "./templating/template-generator";
import { CompilationResult } from "./shared/helpers/compiler-helper";
import { elementRegistry } from "./element-registry";

export { AvailableLanguages } from "./language-map";
export { CompilationResult, compileTypeScriptCode } from "./shared/helpers/compiler-helper";
export { StringWritter } from "./writter/string-writter";

/**
 * transform a sourcefile to a target language
 * @param compilationResult sourcefile + typeChecker
 * @param writter 
 * @param generator
 */
export function printFile(
    compilationResult: CompilationResult, writter: Writteable, generator: TemplateGenerator
): void {
    const file = new File({
        sourceFile: compilationResult.sourceFile,
        typeChecker: compilationResult.typeChecker,
        elementFactory: elementRegistry
    });

    file.parse(compilationResult.sourceFile);

    const data = TemplateGenerator.get(generator, file);
    //console.log(data.template);
    // const helpers = (data.data as any).helpers;
    // Object.keys(helpers).forEach(k => {
    //     console.log(k, helpers[k].toString());
    // });

    // console.log(JSON.stringify((data.data as RootSourceElement).classes));
    // console.log(JSON.stringify((data.data as RootSourceElement).interfaces));
    // console.log(JSON.stringify((data.data as RootSourceElement).constants));

    //console.log(render(data.template, data.data));
    writter.write(render(data.template, data.data));
}

/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { SourceFile } from "typescript";
import { Writteable } from "./writter/writter";
import { File } from "./shared/file";

export { AvailableLanguages, languageMap } from "./language-map";
export { CompilationResult, compileTypeScriptCode } from "./shared/helpers/compiler-helper";
export { StringWritter } from "./writter/string-writter";
export { SourceFile };

/**
 * transform a sourcefile to a target language
 * @param node 
 * @param writter 
 * @param file 
 */
export function printFile(
    node: SourceFile, writter: Writteable, file: File
): void {
    writter.setOpts({
        indentChar: file.getIndentChar(),
        indentValue: file.getIndentValue()
    });
    file.parse(node);
    file.print(writter);
}

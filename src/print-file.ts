/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { SourceFile, TypeChecker } from "typescript";
import { Writteable } from "./writter/writter";
import { File } from "./shared/file";
import { Factory } from "./shared/types/factory";
import { basename, extname, resolve, dirname } from "./shims/path";
import { printFile } from "./lib";

export function printFiles(
    node: SourceFile[], writter: Writteable, fileFactory: Factory<File>, typeChecker: TypeChecker
): void {
    node.forEach(sourceFile => {
        const file = new fileFactory({ sourceFile, typeChecker });
        const newFileName = basename(sourceFile.fileName).replace(extname(sourceFile.fileName), file.getExtension());
        console.log(`--- Processing: ${sourceFile.fileName} ---`);
        console.log("");
        writter.setOpts({
            fileName: resolve(dirname(sourceFile.fileName), newFileName)
        });
        printFile(sourceFile, writter, file);
    });
}

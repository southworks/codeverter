/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { SourceFile, TypeChecker } from "typescript";
import { Writteable } from "./writter/writter";
import { Factory } from "./shared/types/factory";
import { basename, extname, resolve, dirname } from "path";
import { printFile } from "./lib";
import { TemplateGenerator } from "./templating/template-generator";

export function printFiles(
    node: SourceFile[], writter: Writteable, templateFactory: Factory<TemplateGenerator, void>, typeChecker: TypeChecker
): void {
    node.forEach(sourceFile => {
        const template = new templateFactory();
        const newFileName = basename(sourceFile.fileName).replace(extname(sourceFile.fileName), template.getExtension());
        console.log(`--- Processing: ${sourceFile.fileName} ---`);
        console.log("");
        writter.setOpts({
            fileName: resolve(dirname(sourceFile.fileName), newFileName)
        });
        printFile({ sourceFile, typeChecker }, template, writter);
    });
}

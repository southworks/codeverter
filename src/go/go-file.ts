/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { File } from "../shared/file";
import { sanitize } from "../shared/helpers/filename-sanitizer";
import { printBlock } from "../shared/helpers/print-helper";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { GoClass } from "./go-class";
import { GoEnum } from "./go-enum";
import { GoFunction } from "./go-function";
import { GoImports } from "./go-imports";
import { GoInterface } from "./go-interface";
import { GoVariable } from "./go-variable";

export class GoFile extends File {
    constructor(params: FactoryParams) {
        super(params, GoClass, GoVariable, GoImports, GoFunction, GoEnum, GoInterface);
    }

    public getExtension(): string {
        return ".go";
    }

    public getIndentChar(): string {
        return "\t";
    }

    public getIndentValue(): number {
        return 1;
    }

    public print(writter: Writteable): boolean {
        writter.write(`package ${sanitize(this.getName().toLowerCase(), "")}`);
        writter.writeNewLine();
        if (this.getImportHandler().print(writter)) {
            writter.writeNewLine();
        }
        const printOpt = { splitted: false, trailingNewLine: true };
        let printContent = printBlock(writter, this.getValues("interface"), printOpt);
        printContent = printBlock(writter, this.getValues("class"), printOpt) || printContent;
        printContent = printBlock(writter, this.getValues("enum"), printOpt) || printContent;
        printContent = printBlock(writter, this.getValues("function"), printOpt) || printContent;
        printContent = printBlock(writter, this.getValues("constant"), printOpt) || printContent;
        printContent = printBlock(writter, this.getValues("variable"), printOpt) || printContent;

        if (!printContent) {
            writter.writeNewLine();
        }
        return true;
    }
}

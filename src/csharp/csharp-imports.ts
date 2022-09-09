/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Imports } from "../shared/imports";
import { Writteable } from "../writter/writter";

export class CSharpImports extends Imports {
    public print(writter: Writteable): boolean {
        let hasPrinted = false;
        for (const imp of this.get()) {
            writter.write(`using ${imp};`);
            hasPrinted = true;
        }
        return hasPrinted;
    }
}

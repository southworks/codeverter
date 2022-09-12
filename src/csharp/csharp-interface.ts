/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { AccessLevel } from "../shared/access-level";
import { Interface } from "../shared/interface";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { CSharpMethod } from "./csharp-method";
import { CSharpProperty } from "./csharp-property";

export class CSharpInterface extends Interface {
    constructor(params: FactoryParams) {
        super(params, CSharpProperty, CSharpMethod);
    }

    public static getFormattedName(name: string): string {
        let intfName = CSharpInterface.prototype.capitalize(name);
        if (!intfName.startsWith("I")) {
            intfName = "I" + intfName;
        }
        return intfName;
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();
        const intfName = CSharpInterface.getFormattedName(this.getName());
        writter.write(`${visibility} interface ${intfName}`);
        writter.write("{");
        writter.incDeepLevel();
        for (let prop of this.getValues("property")) {
            prop.print(writter);
        }
        for (let meth of this.getValues("method")) {
            meth.print(writter);
        }
        writter.decDeepLevel();
        writter.write("}");
        return true;
    }
}

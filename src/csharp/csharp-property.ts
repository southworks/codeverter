/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { AccessLevel } from "../shared/access-level";
import { getArrayValues } from "../shared/helpers/print-helper";
import { Property } from "../shared/property";
import { KnownTypes } from "../shared/type-mapper";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpProperty extends Property {
    constructor(params: FactoryParams) {
        super(params, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();
        if (this.getParent().getKind() == "interface") {
            writter.write(`${this.getType()} ${this.capitalize(this.getName())} { get; set; }`);
        } else {
            let expression = `${visibility} ${this.getType()} ${this.capitalize(this.getName())} { get; set; }`;
            if (this.hasDefaultValue()) {
                let defaultValue = this.getDefaultValue()?.toString() ?? "";
                if (this.getKnownType() === KnownTypes.Array) {
                    defaultValue = getArrayValues(defaultValue);
                    defaultValue = defaultValue === "" ? defaultValue : ` ${defaultValue} `;
                    expression += ` = new ${this.getType()} {${defaultValue}};`;
                } else {
                    expression += ` = ${defaultValue};`;
                }
            }
            writter.write(expression);
        }
        return true;
    }
}

/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Enum } from "../shared/enum";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoEnum extends Enum {
    constructor(params: FactoryParams) {
        super(params, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        writter.write(`const (`);
        writter.incDeepLevel();
        let values = this.getEnumValues();
        Object.keys(values).forEach((k, i) => {
            let value = values[k];
            let type = typeof value === "string" ? "string" : "int";
            value = type == "string" ? `"${value}"` : value;
            let memberStr = `${k}`;
            memberStr += i == 0
                ? ` ${type} = ${value || value === 0 ? value : "iota"}`
                : value ? ` = ${value}` : "";
            writter.write(memberStr);
        });
        writter.decDeepLevel();
        writter.write(`)`);
        return true;
    }
}

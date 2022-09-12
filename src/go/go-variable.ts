/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { AccessLevel } from "../shared/access-level";
import { FactoryParams } from "../shared/types/factory";
import { Variable } from "../shared/variable";
import { Writteable } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoVariable extends Variable {
    constructor(params: FactoryParams) {
        super(params, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const name = (this.getAccessLevel() == AccessLevel.Public && !this.isFuncVariable())
            ? this.capitalize(this.getName())
            : this.getName().toLowerCase();

        const declaration = this.isConst() ? "const" : "var";

        if (!this.getType().trim() && !this.isConst()) {
            writter.write(`${declaration} ${name} := ${this.getValue()}`);
        } else {
            writter.write(`${declaration} ${name} ${this.getType()} = ${this.getValue()}`);
        }

        return true;
    }
}

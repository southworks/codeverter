/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { AccessLevel } from "../shared/access-level";
import { Property } from "../shared/property";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoProperty extends Property {
    constructor(params: FactoryParams) {
        super(params, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const propertyName = this.getAccessLevel() == AccessLevel.Public
            ? this.capitalize(this.getName())
            : this.getName().toLowerCase();

        // In Go interfaces we should only print methods/functions
        if (!this.isSignature()) {
            writter.write(`${propertyName} ${this.getType()}`);
        }
        return true;
    }
}

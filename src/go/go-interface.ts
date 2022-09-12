/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Interface } from "../shared/interface";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { GoMethod } from "./go-method";
import { GoProperty } from "./go-property";

export class GoInterface extends Interface {
    constructor(params: FactoryParams) {
        super(params, GoProperty, GoMethod);
    }

    public print(writter: Writteable): boolean {
        const methods = this.getValues("method");
        if (methods.length > 0) {
            writter.write(`type ${this.getName()} interface {`);
            writter.incDeepLevel();
            for (let meth of this.getValues("method")) {
                meth.print(writter);
            }
            writter.decDeepLevel();
            writter.write("}");
            return true;
        }
        return false;
    }
}

/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Constructor } from "../shared/constructor";
import { FactoryParams } from "../shared/types/factory";
import { ArrayWritter } from "../writter/array-writter";
import { Writteable } from "../writter/writter";
import { GoParameter } from "./go-parameter";
import { GoTypeMapper } from "./go-type-mapper";
import { GoVariable } from "./go-variable";

export class GoConstructor extends Constructor {
    constructor(params: FactoryParams) {
        super(params, GoParameter, GoVariable, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const arrWritter = new ArrayWritter();
        this.getValues("parameter").map(p => p.print(arrWritter));
        const paramStr = arrWritter.getContent().join(", ");

        writter.write(`func New${this.capitalize(this.getName())}(${paramStr}) *${this.getName()} {`);
        writter.incDeepLevel();
        const firstLetter = this.getName().charAt(0).toLowerCase();
        writter.write(`${firstLetter} := ${this.getName()}{}`);

        arrWritter.clear();
        this.getValues("constant").concat(this.getValues("variable")).map(p => p.print(arrWritter));
        arrWritter.getContent().forEach(c => {
            writter.write(c);
        });

        for (const line of this.getContent()) {
            writter.write(`//${line}`);
        }
        writter.write(`return &${firstLetter}`);
        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}

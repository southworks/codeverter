/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { ConstructorDeclaration } from "typescript";
import { Function } from "./function";
import { isParameterConverter } from "./parameter-converter";
import { FactoryParams } from "./types/factory";

export class Constructor extends Function<ConstructorDeclaration> {
    constructor(params: FactoryParams) {
        super(params);
        this.static = false;
    }

    public parse(node: ConstructorDeclaration): void {
        super.parse(node);
        this.name = this.getParent()?.name;
        /**
         * In Typescript can declare a property as a constructor parameter
         */
        node.parameters.filter(p => p.modifiers).forEach(m => {
            const parent = this.getParent();
            if (isParameterConverter(parent)) {
                parent.addParameterAsProperty(m);
            }
        });
    }
}

/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { ConstructorDeclaration } from "typescript";
import { Function } from "./function";

export abstract class Constructor extends Function<ConstructorDeclaration> {
    public getName(): string {
        return this.getParent()?.getName();
    }
}

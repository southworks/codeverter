/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { ParameterDeclaration } from "typescript";
import { TypedClassElement } from "./types/typed-class-element";

export class Parameter extends TypedClassElement<ParameterDeclaration> {
    public parse(node: ParameterDeclaration): void {
        super.parse(node);
        // if still void use any instead
        if (this.knownType == "void") {
            this.knownType = "any";
            this.type = "any";
        }
    }
}

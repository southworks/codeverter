/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { LiteralExpression, VariableDeclaration } from "typescript";
import { ValuedSourceElement } from "./types/source-element";
import { TypedClassElement } from "./types/typed-class-element";

export class Variable extends TypedClassElement<VariableDeclaration> implements ValuedSourceElement {
    public value!: string;

    public parse(node: VariableDeclaration): void {
        super.parse(node);
        this.value = (node.initializer as LiteralExpression)?.text ?? "";
    }
}

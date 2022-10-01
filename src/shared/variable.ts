/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { VariableDeclaration } from "typescript";
import { ValuedSourceElement } from "./types/source-element";
import { TypedClassElement } from "./types/typed-class-element";

export class Variable extends TypedClassElement<VariableDeclaration> implements ValuedSourceElement {
    public value: string | undefined;

    public parse(node: VariableDeclaration): void {
        super.parse(node);
        this.value = node.initializer?.getText();
        if (this.value) {
            this.value = this.value.trim();
            if (this.value.startsWith("'") || this.value.startsWith("\"")) {
                this.value = this.value.substring(1);
            }
            if (this.value.endsWith("'") || this.value.endsWith("\"")) {
                this.value = this.value.substring(0, this.value.length - 1);
            }
        }
    }
}

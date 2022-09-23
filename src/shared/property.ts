/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { PropertyDeclaration } from "typescript";
import { ValuedSourceElement } from "./types/source-element";
import { TypedClassElement } from "./types/typed-class-element";

export class Property extends TypedClassElement<PropertyDeclaration> implements ValuedSourceElement {
    public value: string | number | undefined = undefined;

    protected isSignature(): boolean {
        return this.getParent().kind == "interface";
    }

    public parse(node: PropertyDeclaration): void {
        super.parse(node);
        this.value = node.initializer?.getText();
    }
}

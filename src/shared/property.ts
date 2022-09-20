/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { PropertyDeclaration } from "typescript";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Property extends TypedClassElement<PropertyDeclaration> {
    private defaultValue: string | number | undefined = undefined;

    protected isSignature(): boolean {
        return this.getParent().getKind() == "interface";
    }

    protected hasDefaultValue(): boolean {
        return this.defaultValue !== undefined;
    }

    protected getDefaultValue(): string | number | undefined {
        return this.defaultValue;
    }

    public parse(node: PropertyDeclaration): void {
        super.parse(node);
        this.defaultValue = node.initializer?.getText();
    }
}

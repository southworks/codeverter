/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { EnumDeclaration, Identifier, SyntaxKind } from "typescript";
import { KnownTypes } from "./type-mapper";
import { EnumSourceElement, ValuedSourceElement } from "./types/source-element";
import { TypedClassElement } from "./types/typed-class-element";

type EnumerableValues = {
    [key: string]: string | number;
}

export class Enum extends TypedClassElement<EnumDeclaration> implements EnumSourceElement<EnumDeclaration> {
    private enumValues: EnumerableValues = {};

    public parse(node: EnumDeclaration): void {
        super.parse(node);
        node.members.forEach(m => {
            let text = (m.initializer as Identifier)?.text;
            let value = m.initializer?.kind == SyntaxKind.NumericLiteral ? Number.parseInt(text) : text;
            let enumKey = (m.name as Identifier)?.escapedText!;
            this.enumValues[enumKey] = value;
        });
    }

    get value(): ValuedSourceElement[] {
        return Object.keys(this.enumValues).map(k => {
            let val = this.enumValues[k];
            let type = typeof val === "string" ? KnownTypes.String : KnownTypes.Number;
            return {
                name: k,
                kind: "enum",
                type: type,
                knownType: type,
                value: val
            } as ValuedSourceElement;
        });
    }
}

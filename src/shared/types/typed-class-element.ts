/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { ClassElement } from "../class-element";
import { KnownTypes, TypeMapper } from "../type-mapper";
import { TypedSourceElement } from "./source-element";
import { TypedDeclaration } from "./typed-declaration";

export class TypedClassElement<K extends TypedDeclaration> extends ClassElement<K> implements TypedSourceElement<K> {
    public type!: string | KnownTypes;
    public knownType!: KnownTypes;

    public parse(node: K): void {
        super.parse(node);
        const { knownType, type } = TypeMapper.getType(node, node.type);
        this.knownType = knownType;
        this.type = type;
    }
}

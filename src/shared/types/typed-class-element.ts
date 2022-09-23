/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { ClassElement } from "../class-element";
import { Imports } from "../imports";
import { KnownTypes, TypeMapper, TypeMapperImpl } from "../type-mapper";
import { FactoryParams } from "./factory";
import { Importer } from "./importer";
import { TypedSourceElement } from "./source-element";
import { TypedDeclaration } from "./typed-declaration";

export class TypedClassElement<K extends TypedDeclaration> extends ClassElement<K> implements TypedSourceElement<K> {
    private typeMapper: TypeMapper & Importer;
    public type!: string | KnownTypes;
    public knownType!: KnownTypes;

    constructor(params: FactoryParams) {
        super(params);
        this.typeMapper = new TypeMapperImpl();
    }

    public parse(node: K): void {
        super.parse(node);
        this.knownType = this.typeMapper.toKnownType(node.type!);
        this.type = this.typeMapper.get(node.type!);
    }

    public setImportHandler(handler: Imports): void {
        super.setImportHandler(handler);
        this.typeMapper.setImportHandler(handler);
    }
}

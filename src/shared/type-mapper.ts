/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import {
    Identifier,
    SyntaxKind,
    TypeNode,
    TypeReferenceNode
} from "typescript";
import { Importer } from "./types/importer";
import { Imports } from "./imports";

export enum KnownTypes {
    Number,
    String,
    Boolean,
    Date,
    Reference,
    Void
}

export interface TypeMapper {
    get(node: TypeNode | SyntaxKind): string | undefined;
    toKnownType(node: TypeNode): KnownTypes;
}

export abstract class TypeMapperImpl implements TypeMapper, Importer {
    private importHandler!: Imports;

    protected abstract getKnownType(type: KnownTypes): string;

    protected abstract getVoidType(): string;

    public setImportHandler(handler: Imports): void {
        this.importHandler = handler;
    }

    public getImportHandler(): Imports {
        return this.importHandler;
    }

    public get(node: TypeNode): string | undefined {
        const kind = this.toKnownType(node);
        switch (kind) {
            case KnownTypes.Reference: {
                return ((node as TypeReferenceNode).typeName as Identifier).escapedText!
            }
            case KnownTypes.Void: return this.getVoidType();
            default:
                return this.getKnownType(kind);
        }
    }

    public toKnownType(node: TypeNode): KnownTypes {
        switch (node?.kind) {
            case SyntaxKind.NumberKeyword:
                return KnownTypes.Number;
            case SyntaxKind.StringKeyword:
                return KnownTypes.String;
            case SyntaxKind.BooleanKeyword:
                return KnownTypes.Boolean;
            default: {
                if (node?.kind == SyntaxKind.TypeReference) {
                    const referenceType = ((node as TypeReferenceNode).typeName as Identifier).escapedText!;
                    if (referenceType == "Date") {
                        return KnownTypes.Date;
                    }
                    return KnownTypes.Reference;
                }
                return KnownTypes.Void;
            }
        }
    }
}

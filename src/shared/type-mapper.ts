/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import {
    ArrayTypeNode,
    Identifier,
    NodeArray,
    NodeWithTypeArguments,
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
    Void,
    Array
}

export interface TypeMapper {
    get(node: TypeNode | SyntaxKind): string | KnownTypes;
    toKnownType(node: TypeNode): KnownTypes;
}

export class TypeMapperImpl implements TypeMapper, Importer {
    private importHandler!: Imports;

    private isGenericArray(node: TypeNode): node is NodeWithTypeArguments {
        return "typeArguments" in node;
    }

    protected getVoidType(): string {
        return ""
    }

    public setImportHandler(handler: Imports): void {
        this.importHandler = handler;
    }

    public getImportHandler(): Imports {
        return this.importHandler;
    }

    public get(node: TypeNode): string | KnownTypes {
        const kind = this.toKnownType(node);
        switch (kind) {
            case KnownTypes.Reference: {
                return ((node as TypeReferenceNode).typeName as Identifier).escapedText!
            }
            case KnownTypes.Array: {
                let typeKind;
                if (this.isGenericArray(node)) {
                    typeKind = this.toKnownType(((node as NodeWithTypeArguments).typeArguments as NodeArray<TypeNode>)[0]);
                } else {
                    typeKind = this.toKnownType(((node as ArrayTypeNode).elementType as TypeNode));
                }
                return typeKind;
            }
            default: return kind;
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
            case SyntaxKind.ArrayType:
                return KnownTypes.Array;
            default: {
                if (node?.kind == SyntaxKind.TypeReference) {
                    const referenceType = ((node as TypeReferenceNode).typeName as Identifier).escapedText!;
                    if (referenceType == "Date") {
                        return KnownTypes.Date;
                    } else if (referenceType == "Array") {
                        return KnownTypes.Array;
                    }
                    return KnownTypes.Reference;
                }
                return KnownTypes.Void;
            }
        }
    }
}

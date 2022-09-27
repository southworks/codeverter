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
    Type,
    TypeChecker,
    TypeNode,
    TypeReferenceNode
} from "typescript";
import { TypedDeclaration } from "./types/typed-declaration";

interface IntrinsicNamed extends Type {
    intrinsicName: string;
}

export type KnownTypes = "number" | "string" | "boolean" | "date" | "reference" | "void" | "array";

export class TypeMapper {
    private static isGenericArray(node?: TypeNode): node is NodeWithTypeArguments {
        return node != undefined && "typeArguments" in node!;
    }

    public static get(node: TypedDeclaration, typeChecker: TypeChecker): string | KnownTypes {
        let kind = this.toKnownType(typeChecker, node, node.type);
        switch (kind) {
            case "reference": {
                return ((node.type as TypeReferenceNode).typeName as Identifier).escapedText!
            }
            case "array": {
                let typeKind;
                if (this.isGenericArray(node.type)) {
                    typeKind = this.toKnownType(typeChecker, node, ((node.type as NodeWithTypeArguments).typeArguments as NodeArray<TypeNode>)[0]);
                } else {
                    typeKind = this.toKnownType(typeChecker, node, ((node.type as ArrayTypeNode).elementType as TypeNode));
                }
                return typeKind;
            }
            default: return kind;
        }
    }

    public static toKnownType(typeChecker: TypeChecker, node: TypedDeclaration, typeNode?: TypeNode): KnownTypes {
        switch (typeNode?.kind) {
            case SyntaxKind.NumberKeyword:
                return "number";
            case SyntaxKind.StringKeyword:
                return "string";
            case SyntaxKind.BooleanKeyword:
                return "boolean";
            case SyntaxKind.ArrayType:
                return "array";
            default: {
                if (typeNode?.kind == SyntaxKind.TypeReference) {
                    const referenceType = ((typeNode as TypeReferenceNode).typeName as Identifier).escapedText!;
                    if (referenceType == "Date") {
                        return "date";
                    } else if (referenceType == "Array") {
                        return "array";
                    }
                    return "reference";
                }

                // try to infer the type by accessing the node
                const type = typeChecker.getTypeAtLocation(node) as IntrinsicNamed;
                return type.intrinsicName == "number"
                    ? "number"
                    : type.intrinsicName == "string"
                        ? "string"
                        : "void";
            }
        }
    }
}

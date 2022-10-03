/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import {
    ArrayLiteralExpression,
    ArrayTypeNode,
    Expression,
    Identifier,
    NodeArray,
    NodeWithTypeArguments,
    SyntaxKind,
    TypeNode,
    TypeReferenceNode
} from "typescript";
import { TypedDeclaration } from "./types/typed-declaration";

interface InitializerExpression extends Expression {
    readonly expression: Expression;
}

interface InitializerNode extends TypedDeclaration {
    initializer: InitializerExpression | TypeNode | ArrayLiteralExpression | TypedDeclaration;
}

type TypeMapperResult = { knownType: KnownTypes, type: string | KnownTypes };

export type KnownTypes = "number" | "string" | "boolean" | "date" | "reference" | "void" | "array";

export class TypeMapper {
    private static isGenericArray(node?: TypeNode): node is NodeWithTypeArguments {
        return node != undefined && "typeArguments" in node!;
    }

    private static get(kind: KnownTypes, node?: TypedDeclaration, typeNode?: TypeNode | Expression): string | KnownTypes {
        switch (kind) {
            case "reference": {
                let tokenType = typeNode ? typeNode : (node as InitializerNode).initializer;
                if (tokenType?.kind == SyntaxKind.NewExpression) {
                    tokenType = (tokenType as InitializerExpression).expression;
                }
                return tokenType?.kind == SyntaxKind.TypeReference
                    ? ((tokenType as TypeReferenceNode).typeName as Identifier).escapedText!
                    : (tokenType as Identifier)?.escapedText!;
            }
            case "array": {
                let tokenType = typeNode ? typeNode : (node as InitializerNode).initializer;
                if (this.isGenericArray(tokenType as TypeNode)) {
                    tokenType = ((tokenType as NodeWithTypeArguments).typeArguments as NodeArray<TypeNode>)[0];
                } else {
                    tokenType = (tokenType as ArrayTypeNode)?.elementType ?? (tokenType as ArrayLiteralExpression).elements[0];
                }
                return this.toKnownType(node, tokenType);
            }
            default: return kind;
        }
    }

    private static toKnownType(node?: TypedDeclaration, typeNode?: TypeNode | Expression): KnownTypes {
        switch (typeNode?.kind) {
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.NumberKeyword:
                return "number";
            case SyntaxKind.StringLiteral:
            case SyntaxKind.StringKeyword:
                return "string";
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.BooleanKeyword:
                return "boolean";
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ArrayType:
                return "array";
            default: {
                if (typeNode?.kind == SyntaxKind.TypeReference || typeNode?.kind == SyntaxKind.Identifier) {
                    const referenceType = typeNode?.kind == SyntaxKind.TypeReference
                        ? ((typeNode as TypeReferenceNode).typeName as Identifier).escapedText!
                        : (typeNode as Identifier)?.escapedText!;
                    if (referenceType == "Date") {
                        return "date";
                    } else if (referenceType == "Array") {
                        return "array";
                    }
                    return "reference";
                }
                const initializer = (node as InitializerNode)?.initializer;
                if (initializer) {
                    return this.toKnownType(initializer as TypedDeclaration, (initializer as InitializerExpression).expression ?? initializer);
                }
                return "void";
            }
        }
    }

    public static getType(node?: TypedDeclaration, typeNode?: TypeNode | Expression): TypeMapperResult {
        const kind = this.toKnownType(node, typeNode);
        return {
            knownType: kind,
            type: this.get(kind, node, typeNode)
        }
    }
}

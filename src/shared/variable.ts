/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { LiteralExpression, SyntaxKind, VariableDeclaration } from "typescript";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Variable extends TypedClassElement<VariableDeclaration> {
    private value: string = "";
    private valueKind: SyntaxKind = SyntaxKind.StringLiteral;
    private funcVariable: boolean = false;

    protected isFuncVariable(): boolean {
        return this.funcVariable;
    }

    protected isConst(): boolean {
        return this.getKind() == "constant";
    }

    protected getValue(): string {
        return this.valueKind == SyntaxKind.StringLiteral ? `"${this.value}"` : this.value;
    }

    public parse(node: VariableDeclaration): void {
        super.parse(node);
        const parentKind = this.getParent().getKind();
        this.funcVariable = parentKind == "function" || parentKind == "method";
        this.value = (node.initializer as LiteralExpression).text;
        this.valueKind = node.initializer!.kind;
    }
}

/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import {
    Block,
    Expression,
    FunctionDeclaration,
    FunctionLikeDeclarationBase,
    isBlock,
    isVariableStatement,
    ParameterDeclaration,
    ReturnStatement,
    Statement,
    SyntaxKind
} from "typescript";
import { addVaribles } from "./helpers/variable-helper";
import { TypeMapper, TypeMapperResult } from "./type-mapper";
import { ParametrizedSourceElement, TypedSourceElement, ValuedSourceElement } from "./types/source-element";
import { TypedClassElement } from "./types/typed-class-element";

export class Function<K extends FunctionLikeDeclarationBase = FunctionDeclaration>
    extends TypedClassElement<K> implements ParametrizedSourceElement<K> {
    private statements: Statement[] = [];

    public content: string[] = [];
    public static: boolean = true;

    private addParameter(node: ParameterDeclaration): void {
        this.addElement("parameter", node);
    }

    protected getContent(): string[] {
        return this.content;
    }

    protected getStatements(): Statement[] {
        return this.statements;
    }

    /**
     * remove curly brackets and new line characters
     * @param body
     * @returns 
     */
    protected trimBody(body: string): string[] {
        let currentBody = body.substring(1, body.length - 1);
        let values = currentBody.split("\n");
        if (values[0].trim() == "") {
            values = values.splice(1);
        }
        if (values[values.length - 1]?.trim() == "") {
            values = values.splice(0, values.length - 1);
        }
        return values;
    }

    public parse(node: K): void {
        super.parse(node);
        const returnStatement = (node.body as Block)?.statements.find(s => s.kind == SyntaxKind.ReturnStatement) as ReturnStatement;
        const needRefineType = (this.knownType == "array" && this.type == "void")
            || (!node.type && returnStatement?.expression);
        if (needRefineType) {
            let typeResult: TypeMapperResult = { knownType: "void", type: "void" };
            if ((needRefineType as Expression).kind != undefined) {
                let typeAtLocation = this.getTypeChecker().getTypeAtLocation(needRefineType as Expression);
                typeResult = TypeMapper.getTypeFromType(typeAtLocation);
            }
            if (typeResult.knownType == "void") {
                typeResult = TypeMapper.getType(node, returnStatement.expression);
            }
            this.knownType = typeResult.knownType;
            this.type = typeResult.type;
        }
        this.content = this.trimBody(node.body?.getText(this.getSourceFile()) ?? "");

        if (node.body && isBlock(node.body!)) {
            (node.body! as Block).
                statements
                .forEach(s => {
                    if (isVariableStatement(s)) {
                        addVaribles(s.declarationList, (k, n) => this.addElement(k, n));
                    }
                    this.statements.push(s);
                });
        }

        node.parameters.filter(p => !p.modifiers).forEach(m => {
            this.addParameter(m);
        });
    }

    get parameters(): TypedSourceElement[] {
        return this.getValues("parameter") as TypedSourceElement[];
    }

    get variables(): ValuedSourceElement[] {
        return this.getValues("variable") as ValuedSourceElement[];
    }

    get constants(): ValuedSourceElement[] {
        return this.getValues("constant") as ValuedSourceElement[];
    }
}

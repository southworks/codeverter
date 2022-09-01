import { LiteralExpression, SyntaxKind, VariableDeclaration } from "typescript";
import { TypeMapper, TypeMapperImpl } from "./type-mapper";
import { Importer } from "./types/importer";
import { TypedClassElement } from "./types/typed-class-element";

/**
 * TODO : refactor to support also variables
 */
export abstract class Constant<T extends TypeMapper & Importer = TypeMapperImpl> extends TypedClassElement<VariableDeclaration, T> {
    private value: string = "";
    private valueKind: SyntaxKind = SyntaxKind.StringLiteral; 

    public parse(node: VariableDeclaration): void {
        super.parse(node);
        this.value = (node.initializer as LiteralExpression).text;
        this.valueKind = node.initializer!.kind;
    }

    protected getValue(): string {
        return this.valueKind == SyntaxKind.StringLiteral ? `"${this.value}"` : this.value;
    }
}

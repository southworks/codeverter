import { LiteralExpression, SyntaxKind, VariableDeclaration } from "typescript";
import { TypeMapper, TypeMapperImpl } from "./type-mapper";
import { ElementKind } from "./types/elements";
import { Importer } from "./types/importer";
import { Initable } from "./types/initable";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Variable<T extends TypeMapper & Importer = TypeMapperImpl> extends TypedClassElement<VariableDeclaration, T> implements Initable {
    private value: string = "";
    private valueKind: SyntaxKind = SyntaxKind.StringLiteral; 
    private varKind: ElementKind = "constant";

    public parse(node: VariableDeclaration): void {
        super.parse(node);
        this.value = (node.initializer as LiteralExpression).text;
        this.valueKind = node.initializer!.kind;
    }

    public init(kind: ElementKind): void {
        this.varKind = kind;
    }

    protected isConst(): boolean {
        return this.varKind == "constant";
    }

    protected getValue(): string {
        return this.valueKind == SyntaxKind.StringLiteral ? `"${this.value}"` : this.value;
    }
}

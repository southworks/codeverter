import { LiteralExpression, SyntaxKind, VariableDeclaration } from "typescript";
import { ElementKind } from "./types/elements";
import { Initable } from "./types/initable";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Variable extends TypedClassElement<VariableDeclaration> implements Initable {
    private value: string = "";
    private valueKind: SyntaxKind = SyntaxKind.StringLiteral;
    private varKind: ElementKind = "constant";

    protected isConst(): boolean {
        return this.varKind == "constant";
    }

    protected getValue(): string {
        return this.valueKind == SyntaxKind.StringLiteral ? `"${this.value}"` : this.value;
    }

    public parse(node: VariableDeclaration): void {
        super.parse(node);
        this.value = (node.initializer as LiteralExpression).text;
        this.valueKind = node.initializer!.kind;
    }

    public init(kind: ElementKind): void {
        this.varKind = kind;
    }
}

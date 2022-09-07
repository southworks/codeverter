import { EnumDeclaration, Identifier, SyntaxKind } from "typescript";
import { TypedClassElement } from "./types/typed-class-element";

type EnumerableValues = {
    [key: string]: string | number;
}

export abstract class Enum extends TypedClassElement<EnumDeclaration> {

    private enumValues: EnumerableValues = {};

    protected getEnumValues(): EnumerableValues {
        return this.enumValues;
    }

    public parse(node: EnumDeclaration): void {
        super.parse(node);
        node.members.forEach(m => {
            let text = (m.initializer as Identifier).text;
            let value = m.initializer?.kind == SyntaxKind.NumericLiteral ? Number.parseInt(text) : text;
            let enumKey = this.capitalize((m.name as Identifier)?.escapedText!);
            this.enumValues[enumKey] = value;
        });
    }
}
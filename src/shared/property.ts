import { PropertyDeclaration, TypeNode, Identifier } from "typescript";
import { Printable } from "./printable";
import { Writter } from "../writter/writter";
import { Parseable } from "./parseable";
import { TypeMapper, TypeMapperImpl } from "./type-mapper";

export abstract class Property<T extends TypeMapper = TypeMapperImpl> implements Printable, Parseable<PropertyDeclaration> {
    private typeMapper: T;
    private name!: string;
    private type!: TypeNode;

    protected constructor(typeMapperFactory: { new(): T }) {
        this.typeMapper = new typeMapperFactory();
    }

    protected getType(): string | undefined {
        return this.typeMapper.get(this.type);
    }

    protected getName(): string {
        return this.name;
    }

    public parse(node: PropertyDeclaration): void {
        this.name = (node.name as Identifier).escapedText!;
        this.type = node.type!
    }

    public abstract print(writter: Writter): void;
}

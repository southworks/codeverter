import { PropertyDeclaration, TypeNode, Identifier } from "typescript";
import { Printable } from "./printable";
import { Writter } from "../writter/writter";
import { Parseable } from "./parseable";
import { TypeMapper, TypeMapperImpl } from "./type-mapper";
import { AccessLevel, AccessLevelHelper } from "./access-level";

export abstract class Property<T extends TypeMapper = TypeMapperImpl> implements Printable, Parseable<PropertyDeclaration> {
    private typeMapper: T;
    private name!: string;
    private type!: TypeNode;
    private accessLevel!: AccessLevel;

    protected constructor(typeMapperFactory: { new(): T }) {
        this.typeMapper = new typeMapperFactory();
    }

    protected getType(): string | undefined {
        return this.typeMapper.get(this.type);
    }

    protected getName(): string {
        return this.name;
    }

    protected getAccessLevel(): AccessLevel {
        return this.accessLevel;
    }

    public parse(node: PropertyDeclaration): void {
        this.name = (node.name as Identifier).escapedText!;
        this.type = node.type!
        this.accessLevel = AccessLevelHelper.getLevel(node);
    }

    public abstract print(writter: Writter): void;
}

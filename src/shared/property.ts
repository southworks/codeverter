import { PropertyDeclaration, TypeNode, Identifier } from "typescript";
import { Writter } from "../writter/writter";
import { TypeMapper, TypeMapperImpl } from "./type-mapper";
import { AccessLevel, AccessLevelHelper } from "./access-level";
import { Factory } from "./factory";
import { Importer } from "./importer";
import { Imports } from "./imports";
import { SourceElement } from "./source-element";

export abstract class Property<T extends TypeMapper & Importer = TypeMapperImpl> implements SourceElement<PropertyDeclaration> {
    private typeMapper: T;
    private name!: string;
    private type!: string;
    private accessLevel!: AccessLevel;
    private importHandler!: Imports;

    protected constructor(typeMapperFactory: Factory<T>) {
        this.typeMapper = new typeMapperFactory();
    }

    protected getName(): string {
        return this.name;
    }

    protected getType(): string {
        return this.type;
    }

    protected getAccessLevel(): AccessLevel {
        return this.accessLevel;
    }

    public parse(node: PropertyDeclaration): void {
        this.name = (node.name as Identifier).escapedText!;
        this.type = this.typeMapper.get(node.type!) || "error";
        this.accessLevel = AccessLevelHelper.getLevel(node);
    }

    public setImportHandler(handler: Imports): void {
        this.typeMapper.setImportHandler(handler);
        this.importHandler = handler;
    }

    public getImportHandler(): Imports {
        return this.importHandler;
    }

    public abstract print(writter: Writter): boolean;
}

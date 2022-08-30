import { SourceFile } from "typescript";
import { ClassElement } from "../class-element";
import { Imports } from "../imports";
import { TypeMapper, TypeMapperImpl } from "../type-mapper";
import { Factory } from "./factory";
import { Importer } from "./importer";
import { TypedDeclaration } from "./typed-declaration";

export abstract class TypedClassElement<K extends TypedDeclaration, T extends TypeMapper & Importer = TypeMapperImpl> extends ClassElement<K> {
    private typeMapper: T;
    private type!: string;

    protected constructor(sourceFile: SourceFile, typeMapperFactory: Factory<T, void>) {
        super(sourceFile);
        this.typeMapper = new typeMapperFactory();
    }

    protected getType(): string {
        return this.type;
    }

    public parse(node: K): void {
        super.parse(node);
        this.type = this.typeMapper.get(node.type!) || "error";
    }

    public setImportHandler(handler: Imports): void {
        super.setImportHandler(handler);
        this.typeMapper.setImportHandler(handler);
    }
}

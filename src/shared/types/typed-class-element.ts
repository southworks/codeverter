import { SourceFile } from "typescript";
import { ClassElement } from "../class-element";
import { Imports } from "../imports";
import { KnownTypes, TypeMapper } from "../type-mapper";
import { Factory } from "./factory";
import { Importer } from "./importer";
import { TypedDeclaration } from "./typed-declaration";

export abstract class TypedClassElement<K extends TypedDeclaration> extends ClassElement<K> {
    private typeMapper: TypeMapper & Importer;
    private type!: string;
    private knownType!: KnownTypes;

    protected constructor(sourceFile: SourceFile, typeMapperFactory: Factory<TypeMapper & Importer, void>) {
        super(sourceFile);
        this.typeMapper = new typeMapperFactory();
    }

    protected getType(): string {
        return this.type;
    }

    protected getKnownType(): KnownTypes {
        return this.knownType;
    }

    public parse(node: K): void {
        super.parse(node);
        this.knownType = this.typeMapper.toKnownType(node.type!);
        this.type = this.typeMapper.get(node.type!) || "";
    }

    public setImportHandler(handler: Imports): void {
        super.setImportHandler(handler);
        this.typeMapper.setImportHandler(handler);
    }
}

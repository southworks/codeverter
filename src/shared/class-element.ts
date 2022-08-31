import { Declaration, Identifier, NamedDeclaration, SourceFile } from "typescript";
import { Writter } from "../writter/writter";
import { AccessLevel, AccessLevelHelper } from "./access-level";
import { Imports } from "./imports";
import { ElementKind, ElementValues } from "./types/elements";
import { Factories, Factory } from "./types/factory";
import { SourceElement } from "./types/source-element";

export abstract class ClassElement<K extends NamedDeclaration> implements SourceElement<K> {
    private name!: string;
    private accessLevel!: AccessLevel;
    private importHandler!: Imports;
    private parent!: SourceElement;
    private sourceFile: SourceFile;
    private factories: Factories = {};
    private values: ElementValues = new ElementValues();

    protected constructor(sourceFile: SourceFile) {
        this.sourceFile = sourceFile;
    }

    /**
     * Helper function
     * @param val string value to capitalize
     * @returns capitalized value
     */
    protected capitalize(val: string): string {
        return val[0].toUpperCase() + val.substring(1);
    }

    protected setFactory<F extends SourceElement>(key: ElementKind, factory: Factory<F>): void {
        this.factories[key] = factory;
    }

    protected getFactory(key: ElementKind): Factory<SourceElement> {
        return this.factories[key] as Factory<SourceElement>;
    }

    protected getValues(kind: ElementKind): SourceElement[] {
        return this.values.get<SourceElement>(kind);
    }

    protected addElement(kind: ElementKind, node: Declaration): void {
        const factory = this.getFactory(kind);
        let element = new factory(this.getSourceFile());
        element.setImportHandler(this.getImportHandler());
        element.setParent(this);
        if (node) {
            element.parse(node);
        }
        this.values.add(kind, element);
    };

    protected getSourceFile(): SourceFile {
        return this.sourceFile;
    }

    protected getAccessLevel(): AccessLevel {
        return this.accessLevel;
    }

    protected getParent(): SourceElement {
        return this.parent;
    }

    public parse(node: K): void {
        this.name = (node.name as Identifier)?.escapedText ?? "";
        this.accessLevel = AccessLevelHelper.getLevel(node);
    }

    public setImportHandler(handler: Imports): void {
        this.importHandler = handler;
    }

    public getImportHandler(): Imports {
        return this.importHandler;
    }

    public setParent(element: SourceElement): void {
        this.parent = element;
    }

    public getName(): string {
        return this.name;
    }

    public abstract print(writter: Writter): boolean;
}

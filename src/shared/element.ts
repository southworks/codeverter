import { Declaration, Identifier, NamedDeclaration, SourceFile } from "typescript";
import { Writter } from "../writter/writter";
import { Imports } from "./imports";
import { ElementKind, ElementValues } from "./types/elements";
import { Factories, Factory } from "./types/factory";
import { SourceElement } from "./types/source-element";
import { Initable, isInitable } from "../shared/types/initable"

export abstract class Element<K extends NamedDeclaration> implements SourceElement<K> {
    private name!: string;
    private importHandler!: Imports;
    private parent!: SourceElement;
    private factories: Factories = {};
    private values: ElementValues = new ElementValues();

    /**
     * Helper function
     * @param val string value to capitalize
     * @returns capitalized value
     */
    protected capitalize(val: string): string {
        return val[0].toUpperCase() + val.substring(1);
    }

    /**
     * Helper function
     * @param val string value to camelize
     * @returns camelized value
     */
    protected camelize(val: string): string {
        return val[0].toLowerCase() + val.substring(1);
    }

    protected setFactory(key: ElementKind, factory: Factory<SourceElement>): void {
        this.factories[key] = factory;
    }

    protected getFactory(key: ElementKind): Factory<SourceElement> {
        return this.factories[key] as Factory<SourceElement>;
    }

    protected getValues(kind: ElementKind): SourceElement[] {
        return this.values.get<SourceElement>(kind);
    }

    protected createElement(kind: ElementKind): SourceElement {
        const factory = this.getFactory(kind);
        const created = new factory(this.getSourceFile());
        
        if (isInitable(created)) {
            (created as Initable).init(kind);
        }
        
        return created;
    }

    protected addElement(kind: ElementKind, node: Declaration): void {
        let element = this.createElement(kind);
        element.setImportHandler(this.getImportHandler());
        element.setParent(this);
        if (node) {
            element.parse(node);
        }
        this.values.add(kind, element);
    };

    protected getParent(): SourceElement {
        return this.parent;
    }

    protected abstract getSourceFile(): SourceFile;

    public parse(node: K): void {
        this.name = (node.name as Identifier)?.escapedText ?? "";
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

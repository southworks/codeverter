import { Declaration, Identifier, NamedDeclaration, NodeFlags, SourceFile, VariableDeclarationList } from "typescript";
import { Writteable } from "../writter/writter";
import { Imports } from "./imports";
import { ElementKind, ElementValues } from "./types/elements";
import { Factories, Factory } from "./types/factory";
import { SourceElement } from "./types/source-element";

export abstract class Element<K extends NamedDeclaration> implements SourceElement<K> {
    private name!: string;
    private importHandler!: Imports;
    private parent!: SourceElement;
    private factories: Factories = {};
    private values: ElementValues = new ElementValues();
    private kind!: ElementKind;

    private addElementAndParse(kind: ElementKind, node: Declaration): void {
        let element = this.createElement(kind);
        element.setImportHandler(this.getImportHandler());
        element.setParent(this);
        if (node) {
            element.parse(node);
        }
        this.values.add(kind, element);
    }

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
        created.setKind(kind);
        return created;
    }

    protected addElement(kind: ElementKind, node: Declaration): void {
        this.addElementAndParse(kind, node);
    };

    protected getParent(): SourceElement {
        return this.parent;
    }

    protected setName(val: string): void {
        this.name = val;
    }

    protected abstract getSourceFile(): SourceFile;

    public parse(node: K): void {
        this.setName((node.name as Identifier)?.escapedText ?? "");
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

    public setKind(kind: ElementKind): void {
        this.kind = kind;
    }

    public getKind(): ElementKind {
        return this.kind;
    }

    public abstract print(writter: Writteable): boolean;
}

import { Declaration, Identifier, NamedDeclaration, NodeFlags, SourceFile, VariableDeclarationList } from "typescript";
import { Writter } from "../writter/writter";
import { Imports } from "./imports";
import { ElementKind, ElementValues } from "./types/elements";
import { Factories, Factory } from "./types/factory";
import { SourceElement } from "./types/source-element";
import { Initable, isInitable } from "../shared/types/initable";

export abstract class Element<K extends NamedDeclaration> implements SourceElement<K> {
    private name!: string;
    private importHandler!: Imports;
    private parent!: SourceElement;
    private factories: Factories = {};
    private values: ElementValues = new ElementValues();

    private addElementAndParse(kind: ElementKind, node: Declaration, isFunc: boolean): void {
        let element = this.createElement(kind, isFunc);
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

    protected createElement(kind: ElementKind, isFunc: boolean): SourceElement {
        const factory = this.getFactory(kind);
        const created = new factory(this.getSourceFile());
        
        if (isInitable(created)) {
            (created as Initable).init(kind, isFunc);
        }
        
        return created;
    }

    protected addElementVariables(node: VariableDeclarationList, isFunc: boolean) {
        if (node.flags == NodeFlags.Const) {
            node.declarations.forEach(d => {
                this.addElementAndParse("constant", d, isFunc);
            });
        } else if (node.flags == NodeFlags.Let) {
            node.declarations.forEach(d => {
                this.addElementAndParse("variable", d, isFunc);
            });
        }
    }

    protected addElement(kind: ElementKind, node: Declaration): void {
        this.addElementAndParse(kind, node, false);
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

    public abstract print(writter: Writter): boolean;
}

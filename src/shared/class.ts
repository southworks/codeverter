import { Writter } from "../writter/writter";
import { ClassDeclaration, isPropertyDeclaration } from "typescript";
import { Property } from "./property";
import { Factory } from "./factory";
import { Imports } from "./imports";
import { SourceElement } from "./source-element";

export abstract class Class<P extends SourceElement = Property> implements SourceElement<ClassDeclaration> {
    private propertyFactory: Factory<P>;
    private properties: P[] = [];
    private name!: string;
    private importHandler!: Imports;

    protected constructor(propertyFactory: Factory<P>) {
        this.propertyFactory = propertyFactory;
    }

    protected getProperties(): P[] {
        return this.properties;
    }

    protected addProperty(): P {
        let prop = new this.propertyFactory();
        prop.setImportHandler(this.importHandler);
        this.properties.push(prop);
        return prop;
    };

    protected getName(): string {
        return this.name;
    }

    public parse(node: ClassDeclaration): void {
        this.name = node.name?.escapedText!;
        node.members.forEach(m => {
            if (isPropertyDeclaration(m)) {
                let property = this.addProperty();
                property.parse(m);
            }
        })
    }

    public setImportHandler(handler: Imports): void {
        this.importHandler = handler;
    }

    public getImportHandler(): Imports {
        return this.importHandler;
    }

    public abstract print(writter: Writter): boolean;
}

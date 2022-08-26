import { Printable } from "./printable";
import { Writter } from "../writter/writter";
import { ClassDeclaration, isPropertyDeclaration } from "typescript";
import { Parseable } from "./parseable";
import { Property } from "./property";

export abstract class Class<Prop extends Printable & Parseable = Property> implements Printable, Parseable<ClassDeclaration> {
    private propertyFactory: new () => Prop;
    private properties: Prop[] = [];
    private name!: string;

    protected constructor(propertyFactory: { new(): Prop }) {
        this.propertyFactory = propertyFactory;
    }

    protected getProperties(): Prop[] {
        return this.properties;
    }

    protected addProperty(): Prop {
        let prop = new this.propertyFactory();
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

    public abstract print(writter: Writter): void;
}

import { Writter } from "../writter/writter";
import { ClassDeclaration, ConstructorDeclaration, isConstructorDeclaration, isPropertyDeclaration, PropertyDeclaration, SourceFile } from "typescript";
import { Property } from "./property";
import { Factory } from "./types/factory";
import { SourceElement } from "./types/source-element";
import { Constructor } from "./constructor";
import { ClassElement } from "./class-element";

export abstract class Class<P extends SourceElement = Property, C extends SourceElement = Constructor> extends ClassElement<ClassDeclaration> {

    protected constructor(sourceFile: SourceFile, propertyFactory: Factory<P>, constructorFactory: Factory<C>) {
        super(sourceFile);
        this.setFactory("ctr", constructorFactory);
        this.setFactory("property", propertyFactory);
    }

    protected addProperty(node: PropertyDeclaration): void {
        this.addElement("property", node);
    };

    protected addConstructor(node: ConstructorDeclaration): void {
        this.addElement("ctr", node);
    }

    public parse(node: ClassDeclaration): void {
        super.parse(node);
        node.members.forEach(m => {
            if (isPropertyDeclaration(m)) {
                this.addProperty(m);
            } else if (isConstructorDeclaration(m)) {
                this.addConstructor(m);
            }
        });
    }

    public abstract print(writter: Writter): boolean;
}

import { Writter } from "../writter/writter";
import {
    ClassDeclaration,
    ConstructorDeclaration,
    Identifier,
    isConstructorDeclaration,
    isMethodDeclaration,
    isPropertyDeclaration,
    MethodDeclaration,
    PropertyDeclaration,
    SourceFile
} from "typescript";
import { Property } from "./property";
import { Factory } from "./types/factory";
import { Constructor } from "./constructor";
import { Method } from "./method";
import { ClassElement } from "./class-element";

export abstract class Class extends ClassElement<ClassDeclaration> {

    private heritageClauses: Array<string> = [];

    protected constructor(sourceFile: SourceFile,
        propertyFactory: Factory<Property>,
        constructorFactory: Factory<Constructor>,
        methodFactory: Factory<Method>) {

        super(sourceFile);
        this.setFactory("ctr", constructorFactory);
        this.setFactory("property", propertyFactory);
        this.setFactory("method", methodFactory);
    }

    protected setHeritage(node: ClassDeclaration) {
        node.heritageClauses?.forEach(hc => {
            hc.types.forEach(t => {
                this.heritageClauses.push(`I${(t.expression as Identifier).text}`);
            });
        });
    }

    protected getHeritageClauses(): Array<string> {
        return [...this.heritageClauses];
    }

    protected addProperty(node: PropertyDeclaration): void {
        this.addElement("property", node);
    };

    protected addConstructor(node: ConstructorDeclaration): void {
        this.addElement("ctr", node);
    }

    protected addMethod(node: MethodDeclaration): void {
        this.addElement("method", node);
    }

    public parse(node: ClassDeclaration): void {
        super.parse(node);
        this.setHeritage(node);
        node.members.forEach(m => {
            if (isPropertyDeclaration(m)) {
                this.addProperty(m);
            } else if (isConstructorDeclaration(m)) {
                this.addConstructor(m);
            } else if (isMethodDeclaration(m)) {
                this.addMethod(m);
            }
        });
    }

    public abstract print(writter: Writter): boolean;
}

import { SourceFile, Node, ClassDeclaration, SyntaxKind } from "typescript";
import { Writter } from "../writter/writter";
import { Class } from "./class";
import { Parseable } from "./parseable";
import { Printable } from "./printable";

export abstract class File<Cls extends Class = Class> implements Printable, Parseable<SourceFile> {
    private classes: Cls[] = [];
    private classFactory: new () => Cls;

    protected constructor(classFactory: { new(): Cls }) {
        this.classFactory = classFactory;
    }

    private visitClass(node: ClassDeclaration): void {
        let cls = new this.classFactory();
        cls.parse(node);
        this.classes.push(cls);
    }

    private visitNode(node: Node): void {
        if (node.kind == SyntaxKind.ClassDeclaration) {
            this.visitClass(node as ClassDeclaration);
            return;
        }
        node.forEachChild(child => this.visitNode(child));
    }

    protected getClasses(): Cls[] {
        return this.classes;
    }

    public parse(node: SourceFile): void {
        this.visitNode(node);
    }

    public abstract print(writter: Writter): void;
}

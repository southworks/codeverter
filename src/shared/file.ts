import { SourceFile, Node, ClassDeclaration, SyntaxKind } from "typescript";
import { Writter } from "../writter/writter";
import { Class } from "./class";
import { Factory } from "./types/factory";
import { Imports } from "./imports";
import { RootSourceElement, SourceElement } from "./types/source-element";

export abstract class File<C extends SourceElement = Class, I extends Imports = Imports> implements RootSourceElement<SourceFile> {
    /**
     * Must be moved to factories handler like Class
     */
    private classes: C[] = [];
    private classFactory: Factory<C>;
    private importsHandler: I;
    private sourceFile!: SourceFile;

    protected constructor(classFactory: Factory<C>, importsFactory: Factory<I, void>) {
        this.classFactory = classFactory;
        this.importsHandler = new importsFactory();
    }

    private visitClass(node: ClassDeclaration): void {
        let cls = new this.classFactory(this.sourceFile);
        cls.setImportHandler(this.importsHandler);
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

    protected getClasses(): C[] {
        return this.classes;
    }

    public parse(node: SourceFile): void {
        this.sourceFile = node;
        this.visitNode(node);
    }

    public getImportHandler(): Imports {
        return this.importsHandler;
    }

    public abstract print(writter: Writter): boolean;
}

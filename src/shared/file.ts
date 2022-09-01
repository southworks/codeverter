import { SourceFile, Node, ClassDeclaration, isClassDeclaration, isFunctionDeclaration, FunctionDeclaration, VariableDeclarationList, isVariableDeclarationList, isVariableDeclaration, NodeFlags } from "typescript";
import { Writter } from "../writter/writter";
import { Class } from "./class";
import { Factory } from "./types/factory";
import { Imports } from "./imports";
import { RootSourceElement, SourceElement } from "./types/source-element";
import { Element } from "./element";
import { Function } from "./function";
import { Constant } from "./constant";

export abstract class File<C extends SourceElement = Class,
    CN extends Constant = Constant,
    I extends Imports = Imports,
    F extends SourceElement = Function>
    extends Element<SourceFile>
    implements RootSourceElement<SourceFile> {

    private importsHandler: I;
    private sourceFile!: SourceFile;

    protected constructor(classFactory: Factory<C>, constantsFactory: Factory<CN>, importsFactory: Factory<I, void>, functionFactory: Factory<F>) {
        super()
        this.setFactory("class", classFactory);
        this.setFactory("function", functionFactory);
        this.setFactory("constant", constantsFactory);
        this.importsHandler = new importsFactory();
    }

    private addClass(node: ClassDeclaration): void {
        this.addElement("class", node);
    }

    private addFunction(node: FunctionDeclaration): void {
        this.addElement("function", node);
    }

    private addDeclaration(node: VariableDeclarationList): void {
        if (node.flags == NodeFlags.Const) {
            node.declarations.forEach(d => {
                this.addElement("constant", d);
            });
        }
    }

    private visitNode(node: Node): void {
        if (isClassDeclaration(node)) {
            this.addClass(node as ClassDeclaration);
        } else if (isFunctionDeclaration(node)) {
            this.addFunction(node);
        } else if (isVariableDeclarationList(node)) {
            this.addDeclaration(node as VariableDeclarationList);
        } else {
            node.forEachChild(child => this.visitNode(child));
        }
    }

    protected getSourceFile(): SourceFile {
        return this.sourceFile;
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

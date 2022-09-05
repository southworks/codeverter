import {
    SourceFile,
    Node,
    ClassDeclaration,
    isClassDeclaration,
    isFunctionDeclaration,
    FunctionDeclaration,
    VariableDeclarationList,
    isVariableDeclarationList,
    NodeFlags
} from "typescript";
import { Writter } from "../writter/writter";
import { Class } from "./class";
import { Factory } from "./types/factory";
import { Imports } from "./imports";
import { RootSourceElement } from "./types/source-element";
import { Element } from "./element";
import { Function } from "./function";
import { Variable } from "./variable";
import { basename, extname } from "path";

export abstract class File extends Element<SourceFile> implements RootSourceElement<SourceFile> {
    private importsHandler: Imports;
    private sourceFile!: SourceFile;

    protected constructor(classFactory: Factory<Class>,
        constantsFactory: Factory<Variable>,
        importsFactory: Factory<Imports, void>,
        functionFactory: Factory<Function>) {

        super()
        this.setFactory("class", classFactory);
        this.setFactory("function", functionFactory);
        this.setFactory("constant", constantsFactory);
        this.setFactory("variable", constantsFactory);
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
        } else if (node.flags == NodeFlags.Let) {
            node.declarations.forEach(d => {
                this.addElement("variable", d);
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

    public abstract getIndentChar(): string;
    public abstract getIndentValue(): number;

    public parse(node: SourceFile): void {
        this.setName(basename(node.fileName).replace(extname(node.fileName), ""));
        this.sourceFile = node;
        this.visitNode(node);
    }

    public getImportHandler(): Imports {
        return this.importsHandler;
    }

    public abstract print(writter: Writter): boolean;
}

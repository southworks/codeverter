import {
    SourceFile,
    Node,
    ClassDeclaration,
    isClassDeclaration,
    isFunctionDeclaration,
    FunctionDeclaration,
    VariableDeclarationList,
    isVariableDeclarationList,
    NodeFlags,
    isEnumDeclaration,
    EnumDeclaration
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
import { Enum } from "./enum";

export abstract class File extends Element<SourceFile> implements RootSourceElement<SourceFile> {
    private importsHandler: Imports;
    private sourceFile!: SourceFile;

    protected constructor(classFactory: Factory<Class>,
        constantsFactory: Factory<Variable>,
        importsFactory: Factory<Imports, void>,
        functionFactory: Factory<Function>,
        enumsFactory: Factory<Enum>) {

        super()
        this.setFactory("class", classFactory);
        this.setFactory("function", functionFactory);
        this.setFactory("constant", constantsFactory);
        this.setFactory("variable", constantsFactory);
        this.setFactory("enum", enumsFactory);
        this.importsHandler = new importsFactory();
    }

    private addClass(node: ClassDeclaration): void {
        this.addElement("class", node);
    }

    private addFunction(node: FunctionDeclaration): void {
        this.addElement("function", node);
    }

    private addEnumerate(node: EnumDeclaration): void {
        this.addElement("enum", node);
    }

    private addDeclaration(node: VariableDeclarationList): void {
        this.addElementVariables(node, false);
    }

    private visitNode(node: Node): void {
        if (isClassDeclaration(node)) {
            this.addClass(node as ClassDeclaration);
        } else if (isFunctionDeclaration(node)) {
            this.addFunction(node);
        } else if (isVariableDeclarationList(node)) {
            this.addDeclaration(node as VariableDeclarationList);
        } else if (isEnumDeclaration(node)) {
            this.addEnumerate(node);
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

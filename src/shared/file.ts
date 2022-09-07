import {
    SourceFile,
    Node,
    ClassDeclaration,
    isClassDeclaration,
    isFunctionDeclaration,
    FunctionDeclaration,
    VariableDeclarationList,
    isVariableDeclarationList,
    isEnumDeclaration,
    EnumDeclaration,
    isInterfaceDeclaration,
    InterfaceDeclaration
} from "typescript";
import { Writteable } from "../writter/writter";
import { Class } from "./class";
import { Factory } from "./types/factory";
import { Imports } from "./imports";
import { RootSourceElement } from "./types/source-element";
import { Element } from "./element";
import { Function } from "./function";
import { Variable } from "./variable";
import { basename, extname } from "path";
import { Enum } from "./enum";
import { addVaribles } from "./helpers/variable-helper";
import { Interface } from "./interface";

export abstract class File extends Element<SourceFile> implements RootSourceElement<SourceFile> {
    private importsHandler: Imports;
    private sourceFile!: SourceFile;

    protected constructor(classFactory: Factory<Class>,
        constantsFactory: Factory<Variable>,
        importsFactory: Factory<Imports, void>,
        functionFactory: Factory<Function>,
        enumsFactory: Factory<Enum>,
        interfaceFactory: Factory<Interface>) {

        super();
        this.setKind("file");
        this.setFactory("class", classFactory);
        this.setFactory("function", functionFactory);
        this.setFactory("constant", constantsFactory);
        this.setFactory("variable", constantsFactory);
        this.setFactory("enum", enumsFactory);
        this.setFactory("interface", interfaceFactory);
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

    private addInterface(node: InterfaceDeclaration): void {
        this.addElement("interface", node);
    }

    private addDeclaration(node: VariableDeclarationList): void {
        addVaribles(node, (k, n) => this.addElement(k, n));
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
        } else if (isInterfaceDeclaration(node)) {
            this.addInterface(node);
        } else {
            node.forEachChild(child => this.visitNode(child));
        }
    }

    protected getSourceFile(): SourceFile {
        return this.sourceFile;
    }

    public abstract getExtension(): string;
    public abstract getIndentChar(): string;
    public abstract getIndentValue(): number;

    public parse(node: SourceFile): void {
        this.setName(basename(node.fileName).replace(extname(node.fileName), ""));
        if (!this.sourceFile) {
            this.sourceFile = node;
        }
        this.visitNode(node);
    }

    public getImportHandler(): Imports {
        return this.importsHandler;
    }

    public abstract print(writter: Writteable): boolean;
}

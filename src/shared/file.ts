/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

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
    InterfaceDeclaration,
    TypeChecker
} from "typescript";
import { FactoryParams } from "./types/factory";
import {
    ClassSourceElement,
    EnumSourceElement,
    InterfaceSourceElement,
    ParametrizedSourceElement,
    RootSourceElement,
    ValuedSourceElement
} from "./types/source-element";
import { Element } from "./element";
import { basename, extname } from "path";
import { addVaribles } from "./helpers/variable-helper";

export class File extends Element<SourceFile> implements RootSourceElement<SourceFile> {
    private sourceFile: SourceFile;
    private typeChecker: TypeChecker;

    public constructor(params: FactoryParams) {
        super(params);
        this.sourceFile = params.sourceFile;
        this.typeChecker = params.typeChecker;
        this.kind = "file";
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

    protected getTypeChecker(): TypeChecker {
        return this.typeChecker;
    }

    public parse(node: SourceFile): void {
        this.name = basename(node.fileName).replace(extname(node.fileName), "");
        this.visitNode(node);
    }

    get classes(): ClassSourceElement[] {
        return this.getValues("class") as ClassSourceElement[];
    }

    get interfaces(): InterfaceSourceElement[] {
        return this.getValues("interface") as InterfaceSourceElement[];
    }

    get variables(): ValuedSourceElement[] {
        return this.getValues("variable") as ValuedSourceElement[];
    }

    get constants(): ValuedSourceElement[] {
        return this.getValues("constant") as ValuedSourceElement[];
    }

    get functions(): ParametrizedSourceElement[] {
        return this.getValues("function") as ParametrizedSourceElement[];
    }

    get enumerates(): EnumSourceElement[] {
        return this.getValues("enum") as EnumSourceElement[];
    }
}

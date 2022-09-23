/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Declaration, Identifier, NamedDeclaration, SourceFile, TypeChecker } from "typescript";
import { Imports } from "./imports";
import { ElementKind, ElementValues } from "./types/elements";
import { ElementFactory, Factory, FactoryParams } from "./types/factory";
import { SourceElement } from "./types/source-element";

export abstract class Element<K extends NamedDeclaration> implements SourceElement<K> {
    private importHandler!: Imports;
    private parent!: SourceElement;
    private elementFactory: ElementFactory;
    private values: ElementValues = new ElementValues();

    public name!: string;
    public kind!: ElementKind;

    protected constructor(params: FactoryParams) {
        this.elementFactory = params.elementFactory;
    }

    private addElementAndParse(kind: ElementKind, node: Declaration): void {
        let element = this.createElement(kind);
        element.setImportHandler(this.getImportHandler());
        element.setParent(this);
        if (node) {
            element.parse(node);
        }
        this.values.add(kind, element);
    }

    protected getFactory(key: ElementKind): Factory<SourceElement> {
        return this.elementFactory[key] as Factory<SourceElement>;
    }

    protected getValues(kind: ElementKind): SourceElement[] {
        return this.values.get<SourceElement>(kind);
    }

    protected createElement(kind: ElementKind): SourceElement {
        const factory = this.getFactory(kind);
        const created = new factory({
            sourceFile: this.getSourceFile(),
            typeChecker: this.getTypeChecker(),
            elementFactory: this.elementFactory
        });
        created.kind = kind;
        return created;
    }

    protected addElement(kind: ElementKind, node: Declaration): void {
        this.addElementAndParse(kind, node);
    };

    protected getParent(): SourceElement {
        return this.parent;
    }

    protected abstract getSourceFile(): SourceFile;
    protected abstract getTypeChecker(): TypeChecker;

    public parse(node: K): void {
        this.name = (node.name as Identifier)?.escapedText ?? "";
    }

    public setImportHandler(handler: Imports): void {
        this.importHandler = handler;
    }

    public getImportHandler(): Imports {
        return this.importHandler;
    }

    public setParent(element: SourceElement): void {
        this.parent = element;
    }
}

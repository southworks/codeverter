/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Writter } from "../writter/writter";
import {
    ClassDeclaration,
    ConstructorDeclaration,
    Identifier,
    isConstructorDeclaration,
    isMethodDeclaration,
    isPropertyDeclaration,
    MethodDeclaration,
    ParameterDeclaration,
    PropertyDeclaration
} from "typescript";
import { Property } from "./property";
import { Factory, FactoryParams } from "./types/factory";
import { Constructor } from "./constructor";
import { Method } from "./method";
import { ClassElement } from "./class-element";
import { ParameterConverter } from "./parameter-converter";

export abstract class Class extends ClassElement<ClassDeclaration> implements ParameterConverter {

    private extendsClauses: Array<string> = [];
    private implementsClauses: Array<string> = [];

    protected constructor(params: FactoryParams,
        propertyFactory: Factory<Property>,
        constructorFactory: Factory<Constructor>,
        methodFactory: Factory<Method>) {

        super(params);
        this.setFactory("ctr", constructorFactory);
        this.setFactory("property", propertyFactory);
        this.setFactory("method", methodFactory);
    }

    protected setHeritages(node: ClassDeclaration): void {
        node.heritageClauses?.forEach(hc => {
            hc.types.forEach(t => {
                if (this.getTypeChecker().getTypeFromTypeNode(t).isClass()) {
                    this.extendsClauses.push(`${(t.expression as Identifier).text}`);
                } else {
                    this.implementsClauses.push(`${(t.expression as Identifier).text}`);
                }
            });
        });
    }

    protected getExtends(): Array<string> {
        return this.extendsClauses;
    }

    protected getImplements(): Array<string> {
        return this.implementsClauses;
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

    /**
     * In Typescript can declare a property as a constructor parameter
     */
    public addParameterAsProperty(node: ParameterDeclaration): void {
        this.addElement("property", node);
    }

    public parse(node: ClassDeclaration): void {
        super.parse(node);
        this.setHeritages(node);
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

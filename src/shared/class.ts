/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

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
import { ClassElement } from "./class-element";
import { ParameterConverter } from "./parameter-converter";
import {
    ClassSourceElement,
    NamedElement,
    ParametrizedSourceElement,
    ValuedSourceElement
} from "./types/source-element";

export class Class extends ClassElement<ClassDeclaration> implements ClassSourceElement, ParameterConverter {
    private extendsClauses: Array<string> = [];
    private implementsClauses: Array<string> = [];

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

    get variables(): ValuedSourceElement[] {
        return this.getValues("variable") as ValuedSourceElement[];
    }

    get constants(): ValuedSourceElement[] {
        return this.getValues("constant") as ValuedSourceElement[];
    }

    get properties(): ValuedSourceElement[] {
        return this.getValues("property") as ValuedSourceElement[];
    }

    get methods(): ParametrizedSourceElement[] {
        return this.getValues("method") as ParametrizedSourceElement[];
    }

    get constructors(): ParametrizedSourceElement[] {
        return this.getValues("ctr") as ParametrizedSourceElement[];
    }

    get extends(): NamedElement[] {
        return this.extendsClauses.map(e => ({ name: e }));
    }

    get implements(): NamedElement[] {
        return this.implementsClauses.map(e => ({ name: e }));
    }
}

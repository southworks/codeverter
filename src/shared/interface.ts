/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import {
    Identifier,
    InterfaceDeclaration,
    isMethodSignature,
    isPropertySignature,
    MethodSignature,
    PropertySignature
} from "typescript";
import { ClassElement } from "./class-element";
import { InterfaceSourceElement, NamedElement, ParametrizedSourceElement, ValuedSourceElement } from "./types/source-element";

export class Interface extends ClassElement<InterfaceDeclaration> implements InterfaceSourceElement {
    private extendsClauses: Array<string> = [];

    protected setHeritages(node: InterfaceDeclaration): void {
        node.heritageClauses?.forEach(hc => {
            hc.types.forEach(t => {
                this.extendsClauses.push(`${(t.expression as Identifier).text}`);
            });
        });
    }

    protected addProperty(node: PropertySignature): void {
        this.addElement("property", node);
    }

    protected addMethod(node: MethodSignature): void {
        this.addElement("method", node);
    }

    public parse(node: InterfaceDeclaration): void {
        super.parse(node);
        this.setHeritages(node);
        node.members.forEach(m => {
            if (isPropertySignature(m)) {
                this.addProperty(m);
            } else if (isMethodSignature(m)) {
                this.addMethod(m);
            }
        });
    }

    get properties(): ValuedSourceElement[] {
        return this.getValues("property") as ValuedSourceElement[];
    }

    get methods(): ParametrizedSourceElement[] {
        return this.getValues("method") as ParametrizedSourceElement[];
    }

    get extends(): NamedElement[] {
        return this.extendsClauses.map(e => ({ name: e }));
    }
}

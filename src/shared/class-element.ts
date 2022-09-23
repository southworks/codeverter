/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { NamedDeclaration, SourceFile, TypeChecker } from "typescript";
import { AccessLevel, AccessLevelHelper } from "./access-level";
import { Element } from "./element";
import { FactoryParams } from "./types/factory";
import { Visibility, VisibilitySourceElement } from "./types/source-element";

export class ClassElement<K extends NamedDeclaration> extends Element<K> implements VisibilitySourceElement {
    private sourceFile: SourceFile;
    private typeChecker: TypeChecker;
    private accessLevel!: AccessLevel;

    constructor(params: FactoryParams) {
        super(params);
        this.sourceFile = params.sourceFile;
        this.typeChecker = params.typeChecker;
    }

    protected getSourceFile(): SourceFile {
        return this.sourceFile;
    }

    protected getTypeChecker(): TypeChecker {
        return this.typeChecker;
    }

    public parse(node: K): void {
        super.parse(node);
        this.accessLevel = AccessLevelHelper.getLevel(node);
    }

    get visibility(): Visibility {
        switch (this.accessLevel) {
            case AccessLevel.Private: return "private";
            case AccessLevel.Protected: return "protected";
            default: return "public";
        };
    }
}

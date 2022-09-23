/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { SourceFile, TypeChecker } from "typescript";
import { ElementKind } from "./elements";
import { SourceElement } from "./source-element";
import { Function } from "../function";

export type FactoryParams = {
    sourceFile: SourceFile,
    typeChecker: TypeChecker,
    elementFactory: ElementFactory
}

/**
 * Type alias to an object type with constructor function
 */
export type Factory<T, P = FactoryParams> = { new(params: P): T };

/**
 * Dictionary type to handle available factories
 */
export type ElementFactory = {
    [p in ElementKind]?: Factory<SourceElement>
}

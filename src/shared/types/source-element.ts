/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import {
    ClassDeclaration,
    Declaration,
    EnumDeclaration,
    FunctionLikeDeclarationBase,
    InterfaceDeclaration
} from "typescript";
import { KnownTypes } from "../type-mapper";
import { ElementKind } from "./elements";
import { Importer, ImporterGetter } from "./importer";
import { Parseable } from "./parseable";

export type NamedElement = {
    name: string;
}

/**
 * name: string;
 * parse(node: T): void;
 * getImportHandler(): Imports;
 * setImportHandler(handler: Imports): void;
 */
export type SourceElementNamed<T extends Declaration = Declaration> = Parseable<T> & Importer & NamedElement;

export interface SourceElement<T extends Declaration = Declaration> extends SourceElementNamed<T> {
    kind: ElementKind;
    setParent(element: SourceElement): void;
};

export type Visibility = "public" | "private" | "protected";

export interface VisibilitySourceElement<T extends Declaration = Declaration> extends SourceElement<T> {
    visibility: Visibility;
};

/**
 * If KnownType is:
 * - Reference => type = the reference type name
 * - Array => type = KnownType of array, if KnowType is reference goto - Reference
 * - Else: same as knownType
 */
export interface TypedSourceElement<T extends Declaration = Declaration> extends VisibilitySourceElement<T> {
    knownType: KnownTypes;
    type: string | KnownTypes;
};

export interface EnumSourceElement<T extends EnumDeclaration = EnumDeclaration> extends TypedSourceElement<T> {
    value: ValuedSourceElement[];
};

export interface ParametrizedSourceElement<T extends FunctionLikeDeclarationBase = FunctionLikeDeclarationBase> extends TypedSourceElement<T> {
    parameters: TypedSourceElement[]
    variables: ValuedSourceElement[]
    constants: ValuedSourceElement[]
    content: string[];
    static: boolean;
};

export interface ValuedSourceElement<T extends Declaration = Declaration> extends TypedSourceElement<T> {
    value: string;
};

export interface InterfaceSourceElement<T extends ClassDeclaration | InterfaceDeclaration = InterfaceDeclaration> extends VisibilitySourceElement<T> {
    properties: ValuedSourceElement[],
    methods: ParametrizedSourceElement[],
    extends: NamedElement[]
}

export interface ClassSourceElement<T extends ClassDeclaration = ClassDeclaration> extends InterfaceSourceElement<T> {
    variables: ValuedSourceElement[],
    constants: ValuedSourceElement[],
    constructors: ParametrizedSourceElement[],
    implements: NamedElement[]
}

/**
 * print(writter: Writter): boolean;
 * parse(node: T): void;
 * getImportHandler(): Imports;
 */
type RootSourceElementDef<T extends Declaration = Declaration> = Parseable<T> & ImporterGetter;

/**
 * A root source element, aka file, cannot expose an importer setter. It needs to be created inside so this way
 * we have protected the access.
 */
export interface RootSourceElement<T extends Declaration = Declaration> extends RootSourceElementDef<T> {
    // name: string,
    imports: SourceElementNamed[],
    classes: ClassSourceElement[],
    interfaces: InterfaceSourceElement[],
    variables: ValuedSourceElement[],
    constants: ValuedSourceElement[],
    functions: ParametrizedSourceElement[],
    enumerates: EnumSourceElement[]
};

// type Visibility = "public" | "private" | "protected";

// interface SourceElement2 {
//     name: string;
//     type: string;
//     visibility: Visibility;
//     kind: ElementKind;
// }

// interface RootSourceElement2 extends SourceElement2 {
//     references: [],
//     classes: SourceElement2[],
//     interfaces: SourceElement2[],
//     globals: SourceElement2[]
// }
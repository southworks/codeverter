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
import { VisibilityLevel } from "../visibility-level";
import { ElementKind } from "./elements";
import { Parseable } from "./parseable";

export type NamedElement = {
    name: string;
}

export type SourceElementNamed<T extends Declaration = Declaration> = Parseable<T> & NamedElement;

export interface SourceElement<T extends Declaration = Declaration> extends SourceElementNamed<T> {
    kind: ElementKind;
    parent: SourceElement;
};

export interface VisibilitySourceElement<T extends Declaration = Declaration> extends SourceElement<T> {
    visibility: VisibilityLevel;
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
    value: string | undefined;
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

type RootSourceElementDef<T extends Declaration = Declaration> = Parseable<T>;

export interface RootSourceElement<T extends Declaration = Declaration> extends RootSourceElementDef<T> {
    classes: ClassSourceElement[],
    interfaces: InterfaceSourceElement[],
    variables: ValuedSourceElement[],
    constants: ValuedSourceElement[],
    functions: ParametrizedSourceElement[],
    enumerates: EnumSourceElement[]
};

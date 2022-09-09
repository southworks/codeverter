import { SourceFile, TypeChecker } from "typescript";
import { ElementKind } from "./elements";
import { SourceElement } from "./source-element";

export type FactoryParams = {
    sourceFile: SourceFile,
    typeChecker: TypeChecker
}

/**
 * Type alias to an object type with constructor function
 */
export type Factory<T, P = FactoryParams> = { new(params: P): T };

/**
 * Dictionary type to handle available factories
 */
export type Factories = {
    [p in ElementKind]?: Factory<SourceElement>
}

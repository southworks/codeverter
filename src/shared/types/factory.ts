import { SourceFile } from "typescript";
import { ElementKind } from "./elements";
import { SourceElement } from "./source-element";

/**
 * Type alias to an object type with constructor function
 */
export type Factory<T, P = SourceFile> = { new(sourceFile: P): T };

/**
 * Dictionary type to handle available factories
 */
export type Factories = {
    [p in ElementKind]?: Factory<SourceElement>
}

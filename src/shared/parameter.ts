import { ParameterDeclaration } from "typescript";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Parameter extends TypedClassElement<ParameterDeclaration> {
}

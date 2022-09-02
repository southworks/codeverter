import { PropertyDeclaration } from "typescript";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Property extends TypedClassElement<PropertyDeclaration> {
}

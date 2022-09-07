import { PropertyDeclaration } from "typescript";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Property extends TypedClassElement<PropertyDeclaration> {
    protected isSignature(): boolean {
        return this.getParent().getKind() == "interface";
    }
}

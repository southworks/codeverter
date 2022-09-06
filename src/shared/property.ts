import { PropertyDeclaration } from "typescript";
import { ElementKind } from "./types/elements";
import { Initable } from "./types/initable";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Property extends TypedClassElement<PropertyDeclaration> implements Initable {
    private propKind: string = "property";

    protected isSignature(): boolean {
        return this.propKind == "propertySignature";
    }

    public init(kind: ElementKind): void {
        this.propKind = kind;
    }
}

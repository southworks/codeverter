import { MethodDeclaration } from "typescript";
import { Function } from "./function";
import { ElementKind } from "./types/elements";
import { Initable } from "./types/initable";

export abstract class Method extends Function<MethodDeclaration> implements Initable {
    private methodKind: string = "method";

    protected isSignature(): boolean {
        return this.methodKind === "methodSignature";
    }

    public init(kind: ElementKind): void {
        this.methodKind = kind;
    }
}

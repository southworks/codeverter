import { ConstructorDeclaration } from "typescript";
import { Function } from "./function";

export abstract class Constructor extends Function<ConstructorDeclaration> {
    public getName(): string {
        return this.getParent()?.getName();
    }
}

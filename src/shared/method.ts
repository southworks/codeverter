import { MethodDeclaration } from "typescript";
import { Function } from "./function";

export abstract class Method extends Function<MethodDeclaration> {
}

import { InterfaceDeclaration, isMethodSignature, isPropertySignature, MethodSignature, PropertySignature, SourceFile } from "typescript";
import { ClassElement } from "./class-element";
import { Method } from "./method";
import { Property } from "./property";
import { Factory } from "./types/factory";

export abstract class Interface extends ClassElement<InterfaceDeclaration> {

    protected constructor(sourceFile: SourceFile,
        propertyFactory: Factory<Property>,
        methodFactory: Factory<Method>) {

        super(sourceFile);
        this.setFactory("property", propertyFactory);
        this.setFactory("method", methodFactory);
    }

    protected addProperty(node: PropertySignature) {
        this.addElement("property", node);
    }

    protected addMethod(node: MethodSignature) {
        this.addElement("method", node);
    }

    public parse(node: InterfaceDeclaration): void {
        super.parse(node);
        node.members.forEach(m => {
            if (isPropertySignature(m)) {
                this.addProperty(m);
            } else if (isMethodSignature(m)) {
                this.addMethod(m);
            }
        });
    }
}

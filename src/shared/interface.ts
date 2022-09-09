import { InterfaceDeclaration, isMethodSignature, isPropertySignature, MethodSignature, PropertySignature, SourceFile } from "typescript";
import { ClassElement } from "./class-element";
import { Method } from "./method";
import { Property } from "./property";
import { Factory, FactoryParams } from "./types/factory";

export abstract class Interface extends ClassElement<InterfaceDeclaration> {

    protected constructor(params: FactoryParams,
        propertyFactory: Factory<Property>,
        methodFactory: Factory<Method>) {

        super(params);
        this.setFactory("property", propertyFactory);
        this.setFactory("method", methodFactory);
    }

    protected addProperty(node: PropertySignature): void {
        this.addElement("property", node);
    }

    protected addMethod(node: MethodSignature): void {
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

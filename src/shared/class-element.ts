import { NamedDeclaration, SourceFile, TypeChecker } from "typescript";
import { AccessLevel, AccessLevelHelper } from "./access-level";
import { Element } from "./element";
import { FactoryParams } from "./types/factory";

export abstract class ClassElement<K extends NamedDeclaration> extends Element<K> {
    private sourceFile: SourceFile;
    private typeChecker: TypeChecker;
    private accessLevel!: AccessLevel;

    protected constructor(params: FactoryParams) {
        super();
        this.sourceFile = params.sourceFile;
        this.typeChecker = params.typeChecker;
    }

    protected getSourceFile(): SourceFile {
        return this.sourceFile;
    }

    protected getTypeChecker(): TypeChecker {
        return this.typeChecker;
    }

    protected getAccessLevel(): AccessLevel {
        return this.accessLevel;
    }

    public parse(node: K): void {
        super.parse(node);
        this.accessLevel = AccessLevelHelper.getLevel(node);
    }
}

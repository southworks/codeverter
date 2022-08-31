import { NamedDeclaration, SourceFile } from "typescript";
import { AccessLevel, AccessLevelHelper } from "./access-level";
import { Element } from "./element";

export abstract class ClassElement<K extends NamedDeclaration> extends Element<K> {
    private sourceFile: SourceFile;
    private accessLevel!: AccessLevel;

    protected constructor(sourceFile: SourceFile) {
        super();
        this.sourceFile = sourceFile;
    }

    protected getSourceFile(): SourceFile {
        return this.sourceFile;
    }

    protected getAccessLevel(): AccessLevel {
        return this.accessLevel;
    }

    public parse(node: K): void {
        super.parse(node);
        this.accessLevel = AccessLevelHelper.getLevel(node);
    }
}

import {
    FunctionDeclaration,
    FunctionLikeDeclarationBase,
    ParameterDeclaration,
    SourceFile
} from "typescript";
import { ValueMapper } from "./default-value-mapper";
import { Parameter } from "./parameter";
import { TypeMapper } from "./type-mapper";
import { Factory } from "./types/factory";
import { Importer } from "./types/importer";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Function<K extends FunctionLikeDeclarationBase = FunctionDeclaration>
    extends TypedClassElement<K> {

    private content!: string[];
    private defaultValueMapper?: ValueMapper;
    private returnValue?: string;

    protected constructor(sourceFile: SourceFile,
        parameterFactory: Factory<Parameter>,
        typeMapperFactory: Factory<TypeMapper & Importer, void>,
        defaultValueMapper?: ValueMapper) {

        super(sourceFile, typeMapperFactory);
        this.defaultValueMapper = defaultValueMapper;
        this.setFactory("parameter", parameterFactory);
    }

    private addParameter(node: ParameterDeclaration): void {
        this.addElement("parameter", node);
    }

    protected getContent(): string[] {
        return this.content;
    }

    protected getReturnValue(): string | undefined {
        return this.returnValue;
    }

    /**
     * remove curly brackets and new line characters
     * @param body
     * @returns 
     */
    protected trimBody(body: string): string[] {
        let currentBody = body.substring(1, body.length - 1);
        let values = currentBody.split("\r\n");
        if (values[0].trim() == "") {
            values = values.splice(1);
        }
        if (values[values.length - 1].trim() == "") {
            values = values.splice(0, values.length - 1);
        }
        return values;
    }

    public parse(node: K): void {
        super.parse(node);
        this.content = this.trimBody(node.body?.getText(this.getSourceFile()) ?? "");
        this.returnValue = this.defaultValueMapper?.get(this.getKnownType());

        node.parameters.forEach(m => {
            this.addParameter(m);
        });
    }
}

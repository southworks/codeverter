import {
    Block,
    FunctionDeclaration,
    FunctionLikeDeclarationBase,
    isBlock,
    isVariableStatement,
    ParameterDeclaration,
    SourceFile,
    Statement
} from "typescript";
import { ValueMapper } from "./default-value-mapper";
import { Parameter } from "./parameter";
import { TypeMapper } from "./type-mapper";
import { Factory } from "./types/factory";
import { Importer } from "./types/importer";
import { TypedClassElement } from "./types/typed-class-element";
import { Variable } from "./variable";

export abstract class Function<K extends FunctionLikeDeclarationBase = FunctionDeclaration>
    extends TypedClassElement<K> {

    private statements: Statement[] = [];
    private content: string[] = [];
    private defaultValueMapper?: ValueMapper;
    private returnValue?: string;

    /**
     * Protected constructor to be accessed only by the concrete implementations
     * @param sourceFile 
     * @param parameterFactory 
     * @param typeMapperFactory 
     * @param defaultValueMapper is using factory just for be consistent with the other parameters.
     */
    protected constructor(sourceFile: SourceFile,
        parameterFactory: Factory<Parameter>,
        variableFactory: Factory<Variable>,
        typeMapperFactory: Factory<TypeMapper & Importer, void>,
        defaultValueMapper?: Factory<ValueMapper, void>) {
        super(sourceFile, typeMapperFactory);
        if (defaultValueMapper) {
            this.defaultValueMapper = new defaultValueMapper();
        }
        this.setFactory("parameter", parameterFactory);
        this.setFactory("constant", variableFactory);
        this.setFactory("variable", variableFactory);
    }

    private addParameter(node: ParameterDeclaration): void {
        this.addElement("parameter", node);
    }

    protected getContent(): string[] {
        return this.content;
    }

    protected getStatements(): Statement[] {
        return this.statements;
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
        let values = currentBody.split("\n");
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


        if (node.body && isBlock(node.body!)) {
            (node.body! as Block).
                statements
                .forEach(s => {
                    if (isVariableStatement(s)) {
                        this.addElementVariables(s.declarationList, true);
                    }
                    this.statements.push(s)
                });
        }

        node.parameters.forEach(m => {
            this.addParameter(m);
        });
    }
}

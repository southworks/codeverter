/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { KnownTypes } from "../../shared/type-mapper";
import { TypedSourceElement } from "../../shared/types/source-element";
import { TemplateGenerator } from "../template-generator";
import { TemplateHelper } from "../template-helpers";
import { CSharpHelpers, getCSharpHelpers } from "./csharp-helpers";

export class CSharpGenerator extends TemplateGenerator<CSharpHelpers> {
    private printEnum(varName: string): string {
        return `<%-helpers.printEnum(${varName})%>`;
    }

    private printVariable(varName: string): string {
        return `<%-helpers.printVariable(${varName}, true)%>`;
    }

    private printMethod(parent: string, varName: string): string {
        return `<%-helpers.printMethod(${parent}, ${varName})%>`;
    }

    private printInterface(varName: string): string {
        return `<%-helpers.printInterface(${varName})%>`;
    }

    private printClass(varName: string): string {
        return `<%-helpers.printClass(${varName})%>`;
    }

    public getCustomHelpers(helpers: TemplateHelper & CSharpHelpers): CSharpHelpers {
        return getCSharpHelpers(helpers);
    }

    public getDefaultValueMap(e: TypedSourceElement): string {
        switch (e.type) {
            case "number": return " 0";
            case "string": return " \"\"";
            case "boolean": return " false";
            case "date": return " DateTime.Now";
            case "void": return "";
            default:
                return " null";
        }
    }

    /**
     * Use anonymous function to be able to call it again inside
     * @param knowType 
     * @param type 
     * @returns 
     */
    public getTypeMap(e: TypedSourceElement): string {
        const fn: Function = (kt: KnownTypes, t: string | KnownTypes) => {
            switch (kt) {
                case "number": return "int";
                case "string": return "string";
                case "boolean": return "bool";
                case "date": return "DateTime";
                case "reference": return t;
                case "void": return "void";
                case "array": return `${fn(t, "")}[]`;
                default:
                    return "error";
            }
        };
        return fn(e.knownType, e.type);
    }

    public getDefaultVisibilityOrder(): string[] {
        return ["private", "protected", "public"];
    }

    public getExtension(): string {
        return ".cs";
    }

    public getTemplate(): string {
        this.addLine(`<% let visibilityOrder = ${this.getVisibilityOrder()};`);
        this.addLine(`let classes = ${this.orderBy("sourceFile.classes", "visibility", "visibilityOrder")};`);
        this.addLine(`let interfaces = ${this.orderBy("sourceFile.interfaces", "visibility", "visibilityOrder")};`);
        this.addLine(`let variables = sourceFile.variables;`);
        this.addLine(`let constants = sourceFile.constants;`);
        this.addLine(`let functions = sourceFile.functions;`);
        this.addLine(`let enumerates = sourceFile.enumerates;`);
        this.addLine(`_%>`);
        this.addLine(`namespace ${this.sanitize(this.capitalize("sourceFile.name"), "_")}`);
        this.addComment("======= interfaces section =======");
        this.addLine(`{`);
        this.startFor("int", "interfaces");
        this.addNewLineIf("i != 0");
        this.addLine(this.printInterface("int"));
        this.endFor();
        this.addLine(this.splitBlock("interfaces", "classes"));
        this.addComment("======= classes section =======");
        this.startFor("c", "classes");
        this.addNewLineIf("i != 0");
        this.addLine(this.printClass("c"));
        this.endFor();
        this.addComment("======= statics section =======");
        this.addLine(`<% if(${this.ifAny("variables", "constants", "functions", "enumerates")}) {_%>`);
        this.addNewLineIf(this.ifAny("interfaces", "classes").toString());
        this.addLine(`    public static class Helper`);
        this.addLine(`    {`);
        this.startFor("e", "enumerates");
        this.addNewLineIf("i != 0");
        this.addLine(this.printEnum("e"));
        this.endFor();
        this.addLine(this.splitBlock("enumerates", "variables"));
        this.startFor("v", "variables");
        this.addLine(`        ${this.printVariable("v")}`);
        this.endFor();
        this.startFor("c", "constants");
        this.addLine(`        ${this.printVariable("c")}`);
        this.endFor();
        this.addLine(this.splitBlock("variables.concat(constants).concat(enumerates)", "functions"));
        this.startFor("f", "functions");
        this.addLine(this.printMethod("undefined", "f"));
        this.endFor();
        this.addLine(`    }`);
        this.addLine(`<% }_%>`);
        this.addLine(`}\n`);
        return super.getTemplate();
    }
}

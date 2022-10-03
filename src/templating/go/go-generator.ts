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
import { getGoHelpers, GoHelpers } from "./go-helpers";

export class GoGenerator extends TemplateGenerator<GoHelpers> {
    private printVariable(varName: string, global: boolean): string {
        return `<%-helpers.printVariable(${varName}, ${global})%>`;
    }

    private printEnum(varName: string): string {
        return `<%-helpers.printEnum(${varName})%>`;
    }

    private printClass(varName: string): string {
        return `<%-helpers.printClass(${varName})%>`;
    }

    private printInterface(varName: string): string {
        return `<%-helpers.printInterface(${varName})%>`;
    }

    private printImports(varName: string): string {
        return `<%-helpers.printImports(${varName})%>`;
    }

    private printMethod(varName: string): string {
        return `<%-helpers.printMethod(null, ${varName})%>`;
    }

    public getCustomHelpers(helpers: TemplateHelper & GoHelpers): GoHelpers {
        return getGoHelpers(helpers);
    }

    public getDefaultValueMap(e: TypedSourceElement): string {
        switch (e.knownType) {
            case "number": return " 0";
            case "string": return " \"\"";
            case "boolean": return " false";
            case "date": return " time.Now()";
            case "void": return "";
            default:
                return " null";
        }
    }

    public getDefaultVisibilityOrder(): string[] {
        return ["private", "protected", "public"];
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
                case "date": return "time.Time";
                case "reference": return t;
                case "void": return "";
                case "array": return `[]${fn(t, "")}`;
                default:
                    return "error";
            }
        };
        return fn(e.knownType, e.type);
    }

    public getExtension(): string {
        return ".go";
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
        this.addLine(`package ${this.sanitize(this.toLowerCase("sourceFile.name"), "_")}`);
        this.addLine(this.printImports("sourceFile"));
        this.startFor("e", this.orderBy("enumerates", "visibility", "visibilityOrder"));
        this.addNewLineIf("i != 0");
        this.addLine(this.printEnum("e"));
        this.endFor();
        this.addLine(this.splitBlock("enumerates", "variables.concat(constants)"));
        this.startFor("v", this.orderBy("variables", "visibility", "visibilityOrder"));
        this.addLine(this.printVariable("v", true));
        this.endFor();
        this.addLine(this.splitBlock("variables", "constants"));
        this.startFor("c", this.orderBy("constants", "visibility", "visibilityOrder"));
        this.addLine(this.printVariable("c", true));
        this.endFor();
        this.addLine(this.splitBlock("interfaces", "variables.concat(constants).concat(enumerates)"));
        this.startFor("n", "interfaces");
        this.addNewLineIf("i != 0");
        this.addLine(this.printInterface("n"));
        this.endFor();
        this.addLine(this.splitBlock("classes", "variables.concat(constants).concat(enumerates).concat(interfaces)"));
        this.startFor("c", "classes");
        this.addNewLineIf("i != 0");
        this.addLine(this.printClass("c"));
        this.endFor();
        this.addLine(this.splitBlock("functions", "variables.concat(constants).concat(enumerates).concat(interfaces).concat(classes)"));
        this.startFor("f", "functions");
        this.addNewLineIf("i != 0");
        this.addLine(this.printMethod("f"));
        this.endFor();
        return super.getTemplate();
    }
}

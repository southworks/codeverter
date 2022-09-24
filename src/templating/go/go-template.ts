/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { KnownTypes } from "../../shared/type-mapper";
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

    public getCustomHelpers(helpers: TemplateHelper & GoHelpers): GoHelpers {
        return getGoHelpers(helpers);
    }

    /**
     * Use integers instead the enum to easily convert into string.
     * @param type 
     * @returns 
     */
    public getDefaultValueMap(type: KnownTypes): string {
        switch (type) {
            case 0: return " 0";
            case 1: return " \"\"";
            case 2: return " false";
            case 3: return " new Date()";
            case 5: return "";
            default:
                return " null";
        }
    }

    /**
     * Use anonymous function to be able to call it again inside
     * Use integers instead the enum to easily convert into string.
     * @param knowType 
     * @param type 
     * @returns 
     */
    public getTypeMap(knowType: KnownTypes, type: string): string {
        const fn: Function = (kt: KnownTypes, t: string) => {
            switch (kt) {
                case 0: return "int";
                case 1: return "string";
                case 2: return "bool";
                case 3: return "time.Time";
                case 4: return t; //KnownTypes.Reference
                case 5: return ""; //KnownTypes.Void
                case 6: return `[]${fn(+t, "")}`;
                default:
                    return "error";
            }
        };
        return fn(knowType, type);
    }

    public getExtension(): string {
        return ".go";
    }

    public getTemplate(): string {
        this.addLine(`<% let visibilityOrder = ["public", "protected", "private"];`);
        this.addLine(`let classes = ${this.orderBy("sourceFile.classes", "visibility", "visibilityOrder")};`);
        this.addLine(`let interfaces = ${this.orderBy("sourceFile.interfaces", "visibility", "visibilityOrder")};`);
        this.addLine(`let variables = sourceFile.variables;`);
        this.addLine(`let constants = sourceFile.constants;`);
        this.addLine(`let functions = sourceFile.functions;`);
        this.addLine(`let enumerates = sourceFile.enumerates;`);
        this.addLine(`_%>`);
        this.addLine(`package ${this.sanitize(this.toLowerCase("sourceFile.name", false), "_")}`);
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
        return super.getTemplate();
    }
}

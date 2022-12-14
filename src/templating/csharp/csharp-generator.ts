/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { TemplateGenerator } from "../template-generator";
import { TemplateHelper } from "../template-helpers";
import { CSharpHelpers, getCSharpHelpers } from "./csharp-helpers";

export class CSharpGenerator extends TemplateGenerator<CSharpHelpers> {
    private printEnum(varName: string): string {
        return `<%-helpers.printEnum(${varName})%>`;
    }

    private printVariable(varName: string): string {
        return `<%-helpers.printVariable(${varName})%>`;
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
        this.addLine(this.splitBlock("enumerates", "variables.concat(constants)"));
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

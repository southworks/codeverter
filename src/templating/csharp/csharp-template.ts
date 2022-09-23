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

export class CSharpGenerator extends TemplateGenerator {
    private getDefaultValue(varName: string, semicolon: boolean): string {
        return `<%-helpers.generateInitializeValue(${varName}.knownType, ${varName}.type, ${varName}.value, ${semicolon})%>`;
    }

    private resolveParameters(varName: string): string {
        return `<%${varName}.forEach((v, i) => {%>${this.mapType("v.knownType", "v.type")} <%=v.name%><%- i != ${varName}.length-1 ? ", " : "" %><%})%>`;
    }

    private getPropertyTemplate(varName: string, forInterface: boolean): string {
        let assignDefault = "";
        if (!forInterface) {
            assignDefault = this.getDefaultValue(varName, false);
        }
        let visibilityTag = !forInterface ? `<%=${varName}.visibility%> ` : "";
        let propertyTag = `${visibilityTag}${this.mapType(`${varName}.knownType`, `${varName}.type`)} ${this.capitalize(`${varName}.name`)} { get; set; }${assignDefault}`;
        return propertyTag;
    }

    private addMethod(varName: string, forInterface: boolean, includeReturnType: boolean): void {
        let parameters = this.resolveParameters(`${varName}.parameters`);
        let visibility = forInterface ? "" : `<%=${varName}.visibility%> `;
        let trailingSemicolon = forInterface ? ";" : "";
        let staticModifier = `<%- ${varName}.static ? "static " : "" %>`;
        let returnType = includeReturnType ? `${this.mapType(`${varName}.knownType`, `${varName}.type`)} ` : "";
        this.addLine(`        ${visibility}${staticModifier}${returnType}${this.capitalize(`${varName}.name`)}(${parameters})${trailingSemicolon}`);
        if (!forInterface) {
            let constModifier = `<%- v.kind == "constant" ? "const " : "" %>`;
            this.addLine(`        {`);
            this.startFor("v", this.orderBy(`${varName}.variables.concat(${varName}.constants)`, "kind", "['constant', 'variable']"));
            let typeModifier = `<%- v.knownType == ${KnownTypes.Void} ? 'var' : ${this.mapType("v.knownType", "v.type", false)} %>`;
            this.addLine(`            ${constModifier}${typeModifier} ${this.camelize("v.name")}${this.getDefaultValue("v", true)}`);
            this.endFor();
            this.startFor("content", `${varName}.content`);
            this.addLine(`            // <%-content%>`);
            this.endFor();
            if (includeReturnType) {
                this.addLine(`            return${this.mapDefaultValue(varName + ".type")};`);
            }
            this.addLine(`        }`);
        }
    }

    private getEnumValue(varName: string): string {
        return `<% if(${varName}.type == ${KnownTypes.Number}) {%><%=${varName}.value%><%} else {%>"<%=${varName}.value%>"<%}_%>`;
    }

    private getVariable(varName: string, name: string, modifier: string): string {
        let typeModifier = `<%- ${varName}.knownType == ${KnownTypes.Void} ? 'var' : ${this.mapType(`${varName}.knownType`, `${varName}.type`, false)} %>`;
        return `public ${modifier}${typeModifier} ${name}${this.getDefaultValue(varName, true)}`;
    }

    public getCustomHelpers(helpers: TemplateHelper): object {
        return {
            generateInitializeValue: (kt: KnownTypes, t: string, value: string, semicolon: boolean) => {
                if (!!value) {
                    if (kt == 6) { //KnownTypes.Array
                        let defaultValue = value;
                        if (value.match("new Array")) {
                            defaultValue = value.match(/\((.*?)\)/g)?.toString().replace("(", "").replace(")", "") ?? value;
                        } else if (value.includes("[") && value.includes("]")) {
                            defaultValue = value.replace("[", "").replace("]", "");
                        }
                        defaultValue = defaultValue === "" ? defaultValue : ` ${defaultValue} `;
                        return ` = new ${helpers.mapType(kt, t)} {${defaultValue}};`;
                    } else if (kt == 3) { //KnownTypes.Date
                        return ` = new DateTime();`;
                    } else if (kt == 1) { //KnownTypes.String
                        return ` = "${value}";`;
                    }
                    return ` = ${value};`;
                }
                return semicolon ? ";" : "";
            },
            interfaceName: (val: string) => {
                let intfName = val.replace(/\w/, c => c.toUpperCase());
                if (intfName[0] != "I") {
                    intfName = "I" + intfName;
                }
                return intfName;
            }
        }
    }

    /**
     * Use integers instead the enum to easily convert into string.
     * @param type 
     * @returns 
     */
    public getDefaultValueMap(type: KnownTypes): string {
        switch (type) {
            case 0: return " 0"; //KnownTypes.Number
            case 1: return " \"\""; //KnownTypes.String
            case 2: return " false"; //KnownTypes.Boolean
            case 3: return " DateTime.Now"; //KnownTypes.Date
            case 5: return ""; //KnownTypes.Void
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
                case 0: return "int"; // KnownTypes.Number
                case 1: return "string"; //KnownTypes.String
                case 2: return "bool"; //KnownTypes.Boolean
                case 3: return "DateTime"; //KnownTypes.Date
                case 4: return t; //KnownTypes.Reference
                case 5: return "void"; //KnownTypes.Void
                case 6: return `${fn(+t, "")}[]`; //KnownTypes.Array
                default:
                    return "error";
            }
        };
        return fn(knowType, type);
    }

    public getExtension(): string {
        return ".cs";
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
        this.addComment("======= imports section =======");
        this.startFor("im", "sourceFile.imports");
        this.addLine(`using <%=im%>;`);
        this.addNewLineIf("i == sourceFile.imports.length-1");
        this.endFor();
        this.addLine(`namespace ${this.sanitize(this.capitalize("sourceFile.name", false), "_")}`);
        this.addComment("======= interfaces section =======");
        this.addLine(`{`);
        this.startFor("int", "interfaces");
        this.addNewLineIf("i != 0");
        this.addLine(`    <%=int.visibility%> <%=int.kind%> <%=helpers.interfaceName(int.name)%><% if(int.extends.length){ %> : <%=int.extends.map(i => helpers.interfaceName(i.name)).join(', ')%><% }%>`);
        this.addLine(`    {`);
        this.startFor("prop", "int.properties");
        this.addLine(`        ${this.getPropertyTemplate("prop", true)}`);
        this.endFor();
        this.addLine(this.splitBlock("int.properties", "int.methods"));
        this.startFor("m", "int.methods");
        this.addMethod("m", true, true);
        this.endFor();
        this.addLine(`    }`);
        this.endFor();
        this.addLine(this.splitBlock("interfaces", "classes"));
        this.addComment("======= classes section =======");
        this.startFor("c", "classes");
        this.addNewLineIf("i != 0");
        this.addLine(`    <%=c.visibility%> <%=c.kind%> ${this.capitalize("c.name")}<% if(c.extends.length || c.implements.length){ %> : <%=c.extends.map(i => i.name).concat(c.implements.map(i => helpers.interfaceName(i.name))).join(', ')%><% }%>`);
        this.addLine(`    {`);
        this.addComment("======= classes: properties section =======");
        this.startFor("prop", this.orderBy("c.properties", "visibility", "visibilityOrder"));
        this.addLine(`        ${this.getPropertyTemplate("prop", false)}`);
        this.endFor();
        this.addLine(this.splitBlock("c.properties", "c.constructors"));
        this.addComment("======= classes: constructor section =======");
        this.startFor("ctr", this.orderBy("c.constructors", "visibility", "visibilityOrder"));
        this.addMethod("ctr", false, false);
        this.endFor();
        this.addLine(this.splitBlock("c.properties.concat(c.constructors)", "c.methods"));
        this.addComment("======= classes: methods section =======");
        this.startFor("m", this.orderBy("c.methods", "visibility", "visibilityOrder"));
        this.addNewLineIf("i != 0");
        this.addMethod("m", false, true);
        this.endFor();
        this.addLine(`    }`);
        this.endFor();
        this.addComment("======= statics section =======");
        this.addLine(`<% if(${this.ifAny("variables", "constants", "functions", "enumerates")}) {_%>`);
        this.addNewLineIf(this.ifAny("interfaces", "classes").toString());
        this.addLine(`    public static class Helper`);
        this.addLine(`    {`);
        this.startFor("e", "enumerates");
        this.addNewLineIf("i != 0");
        this.addLine(`        public enum ${this.capitalize("e.name")}`);
        this.addLine(`        {`);
        this.startFor("ev", "e.value");
        this.addLine(`            ${this.capitalize("ev.name")}<%- ev.value != undefined ? ' = ' : '' %>${this.getEnumValue("ev")}<%- i < e.value.length - 1 ? ',' : '' %>`);
        this.endFor();
        this.addLine(`        }`);
        this.endFor();
        this.addLine(this.splitBlock("enumerates", "variables"));
        this.startFor("v", "variables");
        this.addLine(`        ${this.getVariable("v", this.capitalize("v.name"), "static ")}`);
        this.endFor();
        this.startFor("c", "constants");
        this.addLine(`        ${this.getVariable("c", this.toUpperCase("c.name"), "const ")}`);
        this.endFor();
        this.addLine(this.splitBlock("variables.concat(constants).concat(enumerates)", "functions"));
        this.startFor("f", "functions");
        this.addMethod("f", false, true);
        this.endFor();
        this.addLine(`    }`);
        this.addLine(`<% }_%>`);
        this.addLine(`}\n`);
        return super.getTemplate();
    }
}

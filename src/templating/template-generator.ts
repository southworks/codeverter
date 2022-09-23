/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { KnownTypes } from "../shared/type-mapper";
import { TemplateHelper } from "./template-helpers";

export abstract class TemplateGenerator implements TemplateHelper {
    private content: string[] = [];

    protected addLine(val: string): void {
        this.content.push(val);
    }

    protected addNewLineIf(cond: string): void {
        this.addLine(`<% if(${cond}) {_%>`);
        this.addLine(``);
        this.addLine(`<% } _%>`);
    }

    protected addComment(comment: string): void {
        this.addLine(`<%# ${comment} -%>`);
    }

    protected startFor(variable: string, collection: string): void {
        this.addLine(`<% ${collection}.forEach((${variable}, i) => {_%>`);
    }

    protected endFor(): void {
        this.addLine(`<% }); _%>`);
    }

    /**
     * implement custom helpers
     */
    public getCustomHelpers(helpers: TemplateHelper): object {
        return {};
    }

    public abstract getDefaultValueMap(type: KnownTypes): string;
    public abstract getTypeMap(knowType: KnownTypes, type: string): string;
    public abstract getExtension(): string;

    public getTemplate(): string {
        return this.content.join("\n");
    }

    /**
     * mocks for templating
     */
    public camelize(str: string, includeTags: boolean = true): string {
        let camelize = `helpers.camelize(${str})`;
        if (includeTags) {
            camelize = `<%=${camelize}%>`;
        }
        return camelize;
    }

    public capitalize(str: string, includeTags: boolean = true): string {
        let capitalize = `helpers.capitalize(${str})`;
        if (includeTags) {
            capitalize = `<%=${capitalize}%>`;
        }
        return capitalize;
    }

    public sanitize(str: string, replaceChar: string): string {
        return `<%=helpers.sanitize(${str}, "${replaceChar}")%>`;
    }

    public toUpperCase(str: string): string {
        return `<%=helpers.toUpperCase(${str})%>`;
    }

    public toLowerCase(str: string): string {
        return `<%=helpers.toLowerCase(${str})%>`;
    }

    public orderBy(values: [] | string, field: string, order: [] | string): string {
        return `helpers.orderBy(${values}, "${field}", ${order})`;
    }

    public mapType(kt: string | KnownTypes, t: string, includeTags: boolean = true): string {
        let map = `helpers.mapType(${kt}, ${t})`;
        if (includeTags) {
            map = `<%=${map}%>`
        }
        return map;
    }

    public mapDefaultValue(t: KnownTypes | string): string {
        return `<%- helpers.mapDefaultValue(${t}) _%>`;
    }

    public splitBlock(...values: any[]): string {
        return `<%- helpers.splitBlock(${values.join(", ")}) _%>`;
    }

    public ifAny(...values: any[]): string | boolean {
        return `helpers.ifAny(${values.join(", ")})`;
    }
}

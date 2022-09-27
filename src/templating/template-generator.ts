/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { TypedSourceElement } from "../shared/types/source-element";
import { TemplateHelper, TemplateHelpers } from "./template-helpers";

export abstract class TemplateGenerator<H extends object = {}> {
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

    protected orderBy(values: [] | string, field: string, order: [] | string): string {
        return `helpers.orderBy(${values}, "${field}", ${order})`;
    }

    protected sanitize(str: string, replaceChar: string): string {
        return `<%=helpers.sanitize(${str}, "${replaceChar}")%>`;
    }

    protected toLowerCase(str: string): string {
        return `helpers.toLowerCase(${str})`;
    }

    protected splitBlock(...values: any[]): string {
        return `<%- helpers.splitBlock(${values.join(", ")}) _%>`;
    }

    protected capitalize(str: string): string {
        return `helpers.capitalize(${str})`;
    }

    protected getVisibilityOrder(): string {
        return "helpers.defaultVisibilityOrder()";
    }

    protected ifAny(...values: any[]): string {
        return `helpers.ifAny(${values.join(", ")})`;
    }

    protected getContent(): string {
        return this.content.join("\n");
    }

    /**
     * implement custom helpers
     */
    public abstract getCustomHelpers(helpers: TemplateHelper & H): H;
    public abstract getDefaultVisibilityOrder(): string[];
    public abstract getDefaultValueMap(e: TypedSourceElement): string;
    public abstract getTypeMap(e: TypedSourceElement): string;
    public abstract getExtension(): string;

    public getTemplate(): string {
        const content = this.getContent();
        const helpers = TemplateHelpers.build(this);
        return `<% ${TemplateHelpers.toString(helpers)} _%>\r\n${content}`;
    }
}

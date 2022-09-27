/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Declaration } from "typescript";
import { TypedSourceElement } from "../../shared/types/source-element";
import { TemplateGenerator } from "../template-generator";
import { TemplateHelper } from "../template-helpers";
import { readFileSync } from "fs";
import { resolve, extname } from "path";

export class CustomGenerator extends TemplateGenerator {
    private extension: string;

    constructor(filename: string) {
        super();
        const buffer = readFileSync(resolve(__dirname, filename));
        this.extension = extname(filename).replace(".t", "");
        this.addLine(buffer.toString());
    }

    public getCustomHelpers(_: TemplateHelper): {} {
        return {};
    }

    public getDefaultVisibilityOrder(): string[] {
        return [];
    }

    public getDefaultValueMap(_: TypedSourceElement<Declaration>): string {
        return "";
    }

    public getTypeMap(_: TypedSourceElement<Declaration>): string {
        return "";
    }

    public getExtension(): string {
        return `.${this.extension}`;
    }

    public getTemplate(): string {
        return this.getContent();
    }
}

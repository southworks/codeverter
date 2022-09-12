/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Function } from "../shared/function";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { CSharpDefaultValueMapper } from "./csharp-default-value-mapper";
import { CSharpFunctionHelper } from "./csharp-function-helper";
import { CSharpParameter } from "./csharp-parameter";
import { CSharpTypeMapper } from "./csharp-type-mapper";
import { CSharpVariable } from "./csharp-variable";

export class CSharpFunction extends Function {
    constructor(params: FactoryParams) {
        super(params, CSharpParameter, CSharpVariable, CSharpTypeMapper, CSharpDefaultValueMapper);
    }

    public print(writter: Writteable): boolean {
        CSharpFunctionHelper.Write(writter,
            this.capitalize(this.getName()),
            this.getContent(),
            this.getType(),
            this.getReturnValue()!,
            this.getAccessLevel(),
            true,
            this.getValues("parameter"),
            false,
            this.getValues("constant").concat(this.getValues("variable")));
        return true;
    }
}

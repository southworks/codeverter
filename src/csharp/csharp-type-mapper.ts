/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { KnownTypes, TypeMapperImpl } from "../shared/type-mapper";

export class CSharpTypeMapper extends TypeMapperImpl {

    protected getVoidType(): string {
        return "void";
    }

    protected getKnownType(type: KnownTypes): string {
        switch (type) {
            case KnownTypes.Boolean: return "bool";
            case KnownTypes.Number: return "int"; // review
            case KnownTypes.String: return "string";
            case KnownTypes.Date: return "DateTime";
            default:
                console.error("Not supported", type);
                return "error";
        }
    }
}

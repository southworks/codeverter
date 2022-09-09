/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { ValueMapper } from "../shared/default-value-mapper";
import { KnownTypes } from "../shared/type-mapper";

export class GoDefaultValueMapper extends ValueMapper {
    public get(type: KnownTypes): string {
        switch (type) {
            case KnownTypes.Boolean: return "false";
            case KnownTypes.Date: return "new Date()";
            case KnownTypes.Number: return "0";
            case KnownTypes.String: return "\"\"";
            case KnownTypes.Void: return "";
            default:
                return "null";
        }
    }
}

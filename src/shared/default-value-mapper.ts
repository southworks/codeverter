/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { KnownTypes } from "./type-mapper";

/**
 * Abstract value mapper, it could be an interface but we need it as a class to be consistent
 * with the project structure.
 */
export abstract class ValueMapper {
    public abstract get(type: KnownTypes): string;
}

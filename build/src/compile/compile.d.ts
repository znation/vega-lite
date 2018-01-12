import { Config } from '../config';
import * as vlFieldDef from '../fielddef';
import * as log from '../log';
import { TopLevelExtendedSpec } from '../spec';
export interface CompileOptions {
    config?: Config;
    logger?: log.LoggerInterface;
    fieldTitle?: vlFieldDef.FieldTitleFormatter;
}
/**
 * Vega-Lite's main function, for compiling Vega-lite spec into Vega spec.
 *
 * At a high-level, we make the following transformations in different phases:
 *
 * Input spec
 *     |
 *     |  (Normalization)
 *     v
 * Normalized Spec
 *     |
 *     |  (Build Model)
 *     v
 * A model tree of the spec
 *     |
 *     |  (Parse)
 *     v
 * A model tree with parsed components (intermediate structure of visualization primitives in a format that can be easily merged)
 *     |
 *     | (Optimize)
 *     v
 * A model tree with parsed components with the data component optimized
 *     |
 *     | (Assemble)
 *     v
 * Vega spec
 */
export declare function compile(inputSpec: TopLevelExtendedSpec, opt?: CompileOptions): {
    spec: any;
};

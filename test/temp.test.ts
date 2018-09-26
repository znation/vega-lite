import {myCompile as compile} from '../src/compile/compile';

const util = require('util');
const spec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
  data: {
    url: 'data/population.json'
  },
  facet: {
    column: {
      field: 'sex',
      type: 'ordinal'
    }
  },
  spec: {
    layer: [
      {
        transform: [
          {
            aggregate: [
              {
                op: 'min',
                field: 'people',
                as: 'min_people'
              }
            ],
            groupby: []
          }
        ],
        mark: {
          type: 'tick',
          style: 'boxplot-rule'
        },
        encoding: {
          y: {
            field: 'min_people',
            type: 'quantitative'
          }
        }
      },
      {
        transform: [
          {
            window: [],
            groupby: []
          }
        ],
        mark: {
          type: 'point'
        },
        encoding: {
          y: {
            field: 'people',
            type: 'quantitative'
          }
        }
      }
    ]
  }
} as any;

console.log(util.inspect(compile(spec), {showHidden: false, depth: null}));

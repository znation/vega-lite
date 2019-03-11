import {TransformCompiler} from './transforms';

const CLEAR = '_clear';

const CLEAR_EVENTS = {click: 'dblclick', mouseover: 'mouseout'};

const clear: TransformCompiler = {
  has: selCmpt => {
    return true;
  },

  signals: (model, selCmpt, signals) => {
    const type = CLEAR_EVENTS[selCmpt.events[0].type];

    return signals.concat({
      name: selCmpt.name + CLEAR,
      value: false,
      on: [{events: [{source: 'scope', type: type}], update: `modify(\"${selCmpt.name}_store\", null, true)`}]
    });
  }
};

export default clear;

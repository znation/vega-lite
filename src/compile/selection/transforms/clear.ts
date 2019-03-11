import {TUPLE, unitName} from '..';
import {TransformCompiler} from './transforms';

const CLEAR = '_clear';

const clear: TransformCompiler = {
  has: selCmpt => {
    return selCmpt.type === 'multi' && selCmpt.clear;
  },

  signals: (model, selCmpt, signals) => {
    return signals.concat({
      name: selCmpt.name + CLEAR,
      value: false,
      on: [{events: selCmpt.events, update: selCmpt.clear}]
    });
  },

  modifyExpr: (model, selCmpt, expr) => {
    const tpl = selCmpt.name + TUPLE;
    const signal = selCmpt.name + CLEAR;

    return (
      `${signal} ? null : ${tpl}, ` +
      (selCmpt.resolve === 'global' ? `${signal} ? null : true` : `${signal} ? null : {unit: ${unitName(model)}}`)
    );
  }
};

export default clear;

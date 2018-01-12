"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fielddef_1 = require("../../fielddef");
var util_1 = require("../../util");
var common_1 = require("../common");
exports.HEADER_CHANNELS = ['row', 'column'];
exports.HEADER_TYPES = ['header', 'footer'];
function getHeaderType(orient) {
    if (orient === 'top' || orient === 'left') {
        return 'header';
    }
    return 'footer';
}
exports.getHeaderType = getHeaderType;
function getTitleGroup(model, channel) {
    var title = model.component.layoutHeaders[channel].title;
    var textOrient = channel === 'row' ? 'vertical' : undefined;
    var update = __assign({ align: { value: 'center' }, text: { value: title } }, (textOrient === 'vertical' ? { angle: { value: 270 } } : {}));
    return {
        name: model.getName(channel + "_title"),
        role: channel + "-title",
        type: 'group',
        marks: [__assign({ type: 'text', role: channel + "-title-text", style: 'guide-title' }, (util_1.keys(update).length > 0 ? { encode: { update: update } } : {}))]
    };
}
exports.getTitleGroup = getTitleGroup;
function getHeaderGroup(model, channel, headerType, layoutHeader, headerCmpt) {
    if (headerCmpt) {
        var title = null;
        if (layoutHeader.facetFieldDef && headerCmpt.labels) {
            var facetFieldDef = layoutHeader.facetFieldDef;
            var _a = facetFieldDef.header, header = _a === void 0 ? {} : _a;
            var format = header.format, labelAngle = header.labelAngle;
            var update = __assign({}, (labelAngle ? { angle: { value: labelAngle } } : {})
            // TODO(https://github.com/vega/vega-lite/issues/2446): apply label* (e.g, labelAlign, labelBaseline) here
            );
            title = __assign({ text: common_1.formatSignalRef(facetFieldDef, format, 'parent', model.config), offset: 10, orient: channel === 'row' ? 'left' : 'top', style: 'guide-label' }, (util_1.keys(update).length > 0 ? { encode: { update: update } } : {}));
        }
        var axes = headerCmpt.axes;
        var hasAxes = axes && axes.length > 0;
        if (title || hasAxes) {
            var sizeChannel = channel === 'row' ? 'height' : 'width';
            return __assign({ name: model.getName(channel + "_" + headerType), type: 'group', role: channel + "-" + headerType }, (layoutHeader.facetFieldDef ? {
                from: { data: model.getName(channel + '_domain') },
                sort: {
                    field: fielddef_1.field(layoutHeader.facetFieldDef, { expr: 'datum' }),
                    order: (layoutHeader.facetFieldDef.header && layoutHeader.facetFieldDef.sort) || 'ascending'
                }
            } : {}), (title ? { title: title } : {}), (headerCmpt.sizeSignal ? {
                encode: {
                    update: (_b = {},
                        _b[sizeChannel] = headerCmpt.sizeSignal,
                        _b)
                }
            } : {}), (hasAxes ? { axes: axes } : {}));
        }
    }
    return null;
    var _b;
}
exports.getHeaderGroup = getHeaderGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGUvbGF5b3V0L2hlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBSUEsMkNBQXFDO0FBQ3JDLG1DQUFnQztBQUVoQyxvQ0FBMEM7QUFJN0IsUUFBQSxlQUFlLEdBQW9CLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBR3JELFFBQUEsWUFBWSxHQUFpQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQXdDL0QsdUJBQThCLE1BQWtCO0lBQzlDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBTEQsc0NBS0M7QUFFRCx1QkFBOEIsS0FBWSxFQUFFLE9BQXNCO0lBQ2hFLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMzRCxJQUFNLFVBQVUsR0FBRyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUU5RCxJQUFNLE1BQU0sY0FDVixLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLEVBQ3hCLElBQUksRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsSUFDakIsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsRUFBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FHM0QsQ0FBQztJQUVGLE1BQU0sQ0FBQztRQUNMLElBQUksRUFBRyxLQUFLLENBQUMsT0FB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LENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssT0FBQSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUN0QixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLEVBQUU7b0JBQ04sTUFBTTt3QkFDSixHQUFDLFdBQVcsSUFBRyxVQUFVLENBQUMsVUFBVTsyQkFDckM7aUJBQ0Y7YUFDRixDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDSCxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLE1BQUEsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDMUI7UUFDSixDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7O0FBQ2QsQ0FBQztBQXZERCx3Q0F1REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFV0aWxpdHkgZm9yIGdlbmVyYXRpbmcgcm93IC8gY29sdW1uIGhlYWRlcnNcbiAqL1xuaW1wb3J0IHtGYWNldEZpZWxkRGVmfSBmcm9tICcuLi8uLi9mYWNldCc7XG5pbXBvcnQge2ZpZWxkfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge2tleXN9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtBeGlzT3JpZW50LCBWZ0F4aXN9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcbmltcG9ydCB7Zm9ybWF0U2lnbmFsUmVmfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi4vbW9kZWwnO1xuXG5leHBvcnQgdHlwZSBIZWFkZXJDaGFubmVsID0gJ3JvdycgfCAnY29sdW1uJztcbmV4cG9ydCBjb25zdCBIRUFERVJfQ0hBTk5FTFM6IEhlYWRlckNoYW5uZWxbXSA9IFsncm93JywgJ2NvbHVtbiddO1xuXG5leHBvcnQgdHlwZSBIZWFkZXJUeXBlID0gJ2hlYWRlcicgfCAnZm9vdGVyJztcbmV4cG9ydCBjb25zdCBIRUFERVJfVFlQRVM6IEhlYWRlclR5cGVbXSA9IFsnaGVhZGVyJywgJ2Zvb3RlciddO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhbGwgaGVhZGVyLCBmb290ZXJzIGFuZCB0aXRsZSBvZiBhIFZlZ2EgZ3JvdXAgd2l0aCBsYXlvdXQgZGlyZWN0aXZlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExheW91dEhlYWRlckNvbXBvbmVudCB7XG4gIHRpdGxlPzogc3RyaW5nO1xuXG4gIC8vIFRPRE86IHJlcGVhdCBhbmQgY29uY2F0IGNhbiBoYXZlIG11bHRpcGxlIGhlYWRlciAvIGZvb3Rlci5cbiAgLy8gTmVlZCB0byByZWRlc2lnbiB0aGlzIHBhcnQgYSBiaXQuXG5cbiAgZmFjZXRGaWVsZERlZj86IEZhY2V0RmllbGREZWY8c3RyaW5nPjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgaGVhZGVyIGNvbXBvbmVudHMgZm9yIGhlYWRlcnMuXG4gICAqIEZvciBmYWNldCwgdGhlcmUgc2hvdWxkIGJlIG9ubHkgb25lIGhlYWRlciBjb21wb25lbnQsIHdoaWNoIGlzIGRhdGEtZHJpdmVuLlxuICAgKiBGb3IgcmVwZWF0IGFuZCBjb25jYXQsIHRoZXJlIGNhbiBiZSBtdWx0aXBsZSBoZWFkZXIgY29tcG9uZW50cyB0aGF0IGV4cGxpY2l0bHkgbGlzdCBkaWZmZXJlbnQgYXhlcy5cbiAgICovXG4gIGhlYWRlcj86IEhlYWRlckNvbXBvbmVudFtdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBoZWFkZXIgY29tcG9uZW50cyBmb3IgZm9vdGVycy5cbiAgICogRm9yIGZhY2V0LCB0aGVyZSBzaG91bGQgYmUgb25seSBvbmUgaGVhZGVyIGNvbXBvbmVudCwgd2hpY2ggaXMgZGF0YS1kcml2ZW4uXG4gICAqIEZvciByZXBlYXQgYW5kIGNvbmNhdCwgdGhlcmUgY2FuIGJlIG11bHRpcGxlIGhlYWRlciBjb21wb25lbnRzIHRoYXQgZXhwbGljaXRseSBsaXN0IGRpZmZlcmVudCBheGVzLlxuICAgKi9cbiAgZm9vdGVyPzogSGVhZGVyQ29tcG9uZW50W107XG59XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIG9uZSBncm91cCBvZiByb3cvY29sdW1uLWhlYWRlci9mb290ZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSGVhZGVyQ29tcG9uZW50IHtcblxuICBsYWJlbHM6IGJvb2xlYW47XG5cbiAgc2l6ZVNpZ25hbDoge3NpZ25hbDogc3RyaW5nfTtcblxuICBheGVzOiBWZ0F4aXNbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhlYWRlclR5cGUob3JpZW50OiBBeGlzT3JpZW50KSB7XG4gIGlmIChvcmllbnQgPT09ICd0b3AnIHx8IG9yaWVudCA9PT0gJ2xlZnQnKSB7XG4gICAgcmV0dXJuICdoZWFkZXInO1xuICB9XG4gIHJldHVybiAnZm9vdGVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpdGxlR3JvdXAobW9kZWw6IE1vZGVsLCBjaGFubmVsOiBIZWFkZXJDaGFubmVsKSB7XG4gIGNvbnN0IHRpdGxlID0gbW9kZWwuY29tcG9uZW50LmxheW91dEhlYWRlcnNbY2hhbm5lbF0udGl0bGU7XG4gIGNvbnN0IHRleHRPcmllbnQgPSBjaGFubmVsID09PSAncm93JyA/ICd2ZXJ0aWNhbCcgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgdXBkYXRlID0ge1xuICAgIGFsaWduOiB7dmFsdWU6ICdjZW50ZXInfSxcbiAgICB0ZXh0OiB7dmFsdWU6IHRpdGxlfSxcbiAgICAuLi4odGV4dE9yaWVudCA9PT0gJ3ZlcnRpY2FsJyA/IHthbmdsZToge3ZhbHVlOiAyNzB9fToge30pLFxuICAgIC8vIFRPRE8qaHR0cHM6Ly9naXRodWIuY29tL3ZlZ2EvdmVnYS1saXRlL2lzc3Vlcy8yNDQ2KTogYWRkIHRpdGxlKiBwcm9wZXJ0aWVzIChlLmcuLCB0aXRsZUFsaWduKVxuICAgIC8vIGFsc28gbWFrZSBzdXJlIHRoYXQgZ3VpZGUtdGl0bGUgY29uZmlnIG92ZXJyaWRlIHRoZXNlIFZlZ2EtbGl0ZSBkZWZhdWx0XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAgbW9kZWwuZ2V0TmFtZShgJHtjaGFubmVsfV90aXRsZWApLFxuICAgIHJvbGU6IGAke2NoYW5uZWx9LXRpdGxlYCxcbiAgICB0eXBlOiAnZ3JvdXAnLFxuICAgIG1hcmtzOiBbe1xuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgcm9sZTogYCR7Y2hhbm5lbH0tdGl0bGUtdGV4dGAsXG4gICAgICBzdHlsZTogJ2d1aWRlLXRpdGxlJyxcbiAgICAgIC4uLihrZXlzKHVwZGF0ZSkubGVuZ3RoID4gMCA/IHtlbmNvZGU6IHt1cGRhdGV9fSA6IHt9KVxuICAgIH1dXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWFkZXJHcm91cChtb2RlbDogTW9kZWwsIGNoYW5uZWw6IEhlYWRlckNoYW5uZWwsIGhlYWRlclR5cGU6IEhlYWRlclR5cGUsIGxheW91dEhlYWRlcjogTGF5b3V0SGVhZGVyQ29tcG9uZW50LCBoZWFkZXJDbXB0OiBIZWFkZXJDb21wb25lbnQpIHtcbiAgaWYgKGhlYWRlckNtcHQpIHtcbiAgICBsZXQgdGl0bGUgPSBudWxsO1xuICAgIGlmIChsYXlvdXRIZWFkZXIuZmFjZXRGaWVsZERlZiAmJiBoZWFkZXJDbXB0LmxhYmVscykge1xuICAgICAgY29uc3Qge2ZhY2V0RmllbGREZWZ9ID0gbGF5b3V0SGVhZGVyO1xuICAgICAgY29uc3Qge2hlYWRlciA9IHt9fSA9IGZhY2V0RmllbGREZWY7XG4gICAgICBjb25zdCB7Zm9ybWF0LCBsYWJlbEFuZ2xlfSA9IGhlYWRlcjtcblxuICAgICAgY29uc3QgdXBkYXRlID0ge1xuICAgICAgICAuLi4oXG4gICAgICAgICAgbGFiZWxBbmdsZSA/IHthbmdsZToge3ZhbHVlOiBsYWJlbEFuZ2xlfX0gOiB7fVxuICAgICAgICApXG5cbiAgICAgICAgLy8gVE9ETyhodHRwczovL2dpdGh1Yi5jb20vdmVnYS92ZWdhLWxpdGUvaXNzdWVzLzI0NDYpOiBhcHBseSBsYWJlbCogKGUuZywgbGFiZWxBbGlnbiwgbGFiZWxCYXNlbGluZSkgaGVyZVxuICAgICAgfTtcblxuICAgICAgdGl0bGUgPSB7XG4gICAgICAgIHRleHQ6IGZvcm1hdFNpZ25hbFJlZihmYWNldEZpZWxkRGVmLCBmb3JtYXQsICdwYXJlbnQnLCBtb2RlbC5jb25maWcpLFxuICAgICAgICBvZmZzZXQ6IDEwLFxuICAgICAgICBvcmllbnQ6IGNoYW5uZWwgPT09ICdyb3cnID8gJ2xlZnQnIDogJ3RvcCcsXG4gICAgICAgIHN0eWxlOiAnZ3VpZGUtbGFiZWwnLFxuICAgICAgICAuLi4oa2V5cyh1cGRhdGUpLmxlbmd0aCA+IDAgPyB7ZW5jb2RlOiB7dXBkYXRlfX0gOiB7fSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgYXhlcyA9IGhlYWRlckNtcHQuYXhlcztcblxuICAgIGNvbnN0IGhhc0F4ZXMgPSBheGVzICYmIGF4ZXMubGVuZ3RoID4gMDtcbiAgICBpZiAodGl0bGUgfHwgaGFzQXhlcykge1xuICAgICAgY29uc3Qgc2l6ZUNoYW5uZWwgPSBjaGFubmVsID09PSAncm93JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbW9kZWwuZ2V0TmFtZShgJHtjaGFubmVsfV8ke2hlYWRlclR5cGV9YCksXG4gICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgIHJvbGU6IGAke2NoYW5uZWx9LSR7aGVhZGVyVHlwZX1gLFxuICAgICAgICAuLi4obGF5b3V0SGVhZGVyLmZhY2V0RmllbGREZWYgPyB7XG4gICAgICAgICAgZnJvbToge2RhdGE6IG1vZGVsLmdldE5hbWUoY2hhbm5lbCArICdfZG9tYWluJyl9LFxuICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZChsYXlvdXRIZWFkZXIuZmFjZXRGaWVsZERlZiwge2V4cHI6ICdkYXR1bSd9KSxcbiAgICAgICAgICAgIG9yZGVyOiAobGF5b3V0SGVhZGVyLmZhY2V0RmllbGREZWYuaGVhZGVyICYmIGxheW91dEhlYWRlci5mYWNldEZpZWxkRGVmLnNvcnQpIHx8ICdhc2NlbmRpbmcnXG4gICAgICAgICAgfVxuICAgICAgICB9IDoge30pLFxuICAgICAgICAuLi4odGl0bGUgPyB7dGl0bGV9IDoge30pLFxuICAgICAgICAuLi4oaGVhZGVyQ21wdC5zaXplU2lnbmFsID8ge1xuICAgICAgICAgIGVuY29kZToge1xuICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgIFtzaXplQ2hhbm5lbF06IGhlYWRlckNtcHQuc2l6ZVNpZ25hbFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfToge30pLFxuICAgICAgICAuLi4oaGFzQXhlcyA/IHtheGVzfSA6IHt9KVxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=
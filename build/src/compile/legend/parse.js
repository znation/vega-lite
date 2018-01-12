"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var legend_1 = require("../../legend");
var util_1 = require("../../util");
var common_1 = require("../common");
var model_1 = require("../model");
var resolve_1 = require("../resolve");
var split_1 = require("../split");
var split_2 = require("../split");
var component_1 = require("./component");
var encode = require("./encode");
var properties = require("./properties");
function parseLegend(model) {
    if (model_1.isUnitModel(model)) {
        model.component.legends = parseUnitLegend(model);
    }
    else {
        model.component.legends = parseNonUnitLegend(model);
    }
}
exports.parseLegend = parseLegend;
function parseUnitLegend(model) {
    return [channel_1.COLOR, channel_1.SIZE, channel_1.SHAPE, channel_1.OPACITY].reduce(function (legendComponent, channel) {
        if (model.legend(channel)) {
            legendComponent[channel] = parseLegendForChannel(model, channel);
        }
        return legendComponent;
    }, {});
}
function getLegendDefWithScale(model, channel) {
    // For binned field with continuous scale, use a special scale so we can overrride the mark props and labels
    switch (channel) {
        case channel_1.COLOR:
            var scale = model.scaleName(channel_1.COLOR);
            return model.markDef.filled ? { fill: scale } : { stroke: scale };
        case channel_1.SIZE:
            return { size: model.scaleName(channel_1.SIZE) };
        case channel_1.SHAPE:
            return { shape: model.scaleName(channel_1.SHAPE) };
        case channel_1.OPACITY:
            return { opacity: model.scaleName(channel_1.OPACITY) };
    }
    return null;
}
function parseLegendForChannel(model, channel) {
    var fieldDef = model.fieldDef(channel);
    var legend = model.legend(channel);
    var legendCmpt = new component_1.LegendComponent({}, getLegendDefWithScale(model, channel));
    legend_1.LEGEND_PROPERTIES.forEach(function (property) {
        var value = getProperty(property, legend, channel, model);
        if (value !== undefined) {
            var explicit = property === 'values' ?
                !!legend.values : // specified legend.values is already respected, but may get transformed.
                value === legend[property];
            if (explicit || model.config.legend[property] === undefined) {
                legendCmpt.set(property, value, explicit);
            }
        }
    });
    // 2) Add mark property definition groups
    var legendEncoding = legend.encoding || {};
    var legendEncode = ['labels', 'legend', 'title', 'symbols', 'gradient'].reduce(function (e, part) {
        var value = encode[part] ?
            // TODO: replace legendCmpt with type is sufficient
            encode[part](fieldDef, legendEncoding[part], model, channel, legendCmpt.get('type')) : // apply rule
            legendEncoding[part]; // no rule -- just default values
        if (value !== undefined && util_1.keys(value).length > 0) {
            e[part] = { update: value };
        }
        return e;
    }, {});
    if (util_1.keys(legendEncode).length > 0) {
        legendCmpt.set('encode', legendEncode, !!legend.encoding);
    }
    return legendCmpt;
}
exports.parseLegendForChannel = parseLegendForChannel;
function getProperty(property, specifiedLegend, channel, model) {
    var fieldDef = model.fieldDef(channel);
    switch (property) {
        case 'format':
            // We don't include temporal field here as we apply format in encode block
            return common_1.numberFormat(fieldDef, specifiedLegend.format, model.config);
        case 'title':
            return common_1.getSpecifiedOrDefaultValue(specifiedLegend.title, fielddef_1.title(fieldDef, model.config));
        case 'values':
            return properties.values(specifiedLegend);
        case 'type':
            return common_1.getSpecifiedOrDefaultValue(specifiedLegend.type, properties.type(fieldDef.type, channel, model.getScaleComponent(channel).get('type')));
    }
    // Otherwise, return specified property.
    return specifiedLegend[property];
}
function parseNonUnitLegend(model) {
    var _a = model.component, legends = _a.legends, resolve = _a.resolve;
    var _loop_1 = function (child) {
        parseLegend(child);
        util_1.keys(child.component.legends).forEach(function (channel) {
            resolve.legend[channel] = resolve_1.parseGuideResolve(model.component.resolve, channel);
            if (resolve.legend[channel] === 'shared') {
                // If the resolve says shared (and has not been overridden)
                // We will try to merge and see if there is a conflict
                legends[channel] = mergeLegendComponent(legends[channel], child.component.legends[channel]);
                if (!legends[channel]) {
                    // If merge returns nothing, there is a conflict so we cannot make the legend shared.
                    // Thus, mark legend as independent and remove the legend component.
                    resolve.legend[channel] = 'independent';
                    delete legends[channel];
                }
            }
        });
    };
    for (var _i = 0, _b = model.children; _i < _b.length; _i++) {
        var child = _b[_i];
        _loop_1(child);
    }
    util_1.keys(legends).forEach(function (channel) {
        for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (!child.component.legends[channel]) {
                // skip if the child does not have a particular legend
                continue;
            }
            if (resolve.legend[channel] === 'shared') {
                // After merging shared legend, make sure to remove legend from child
                delete child.component.legends[channel];
            }
        }
    });
    return legends;
}
function mergeLegendComponent(mergedLegend, childLegend) {
    if (!mergedLegend) {
        return childLegend.clone();
    }
    var mergedOrient = mergedLegend.getWithExplicit('orient');
    var childOrient = childLegend.getWithExplicit('orient');
    if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
        // TODO: throw warning if resolve is explicit (We don't have info about explicit/implicit resolve yet.)
        // Cannot merge due to inconsistent orient
        return undefined;
    }
    var typeMerged = false;
    var _loop_2 = function (prop) {
        var mergedValueWithExplicit = split_2.mergeValuesWithExplicit(mergedLegend.getWithExplicit(prop), childLegend.getWithExplicit(prop), prop, 'legend', 
        // Tie breaker function
        function (v1, v2) {
            switch (prop) {
                case 'title':
                    return common_1.titleMerger(v1, v2);
                case 'type':
                    // There are only two types. If we have different types, then prefer symbol over gradient.
                    typeMerged = true;
                    return split_1.makeImplicit('symbol');
            }
            return split_2.defaultTieBreaker(v1, v2, prop, 'legend');
        });
        mergedLegend.setWithExplicit(prop, mergedValueWithExplicit);
    };
    // Otherwise, let's merge
    for (var _i = 0, VG_LEGEND_PROPERTIES_1 = legend_1.VG_LEGEND_PROPERTIES; _i < VG_LEGEND_PROPERTIES_1.length; _i++) {
        var prop = VG_LEGEND_PROPERTIES_1[_i];
        _loop_2(prop);
    }
    if (typeMerged) {
        if (((mergedLegend.implicit || {}).encode || {}).gradient) {
            util_1.deleteNestedProperty(mergedLegend.implicit, ['encode', 'gradient']);
        }
        if (((mergedLegend.explicit || {}).encode || {}).gradient) {
            util_1.deleteNestedProperty(mergedLegend.explicit, ['encode', 'gradient']);
        }
    }
    return mergedLegend;
}
exports.mergeLegendComponent = mergeLegendComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcGlsZS9sZWdlbmQvcGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBNEY7QUFDNUYsMkNBQXNEO0FBQ3RELHVDQUE2RTtBQUM3RSxtQ0FBc0Q7QUFFdEQsb0NBQWdGO0FBQ2hGLGtDQUE0QztBQUM1QyxzQ0FBNkM7QUFDN0Msa0NBQWdEO0FBQ2hELGtDQUFvRTtBQUVwRSx5Q0FBa0U7QUFDbEUsaUNBQW1DO0FBQ25DLHlDQUEyQztBQUczQyxxQkFBNEIsS0FBWTtJQUN0QyxFQUFFLENBQUMsQ0FBQyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztBQUNILENBQUM7QUFORCxrQ0FNQztBQUVELHlCQUF5QixLQUFnQjtJQUN2QyxNQUFNLENBQUMsQ0FBQyxlQUFLLEVBQUUsY0FBSSxFQUFFLGVBQUssRUFBRSxpQkFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVMsZUFBZSxFQUFFLE9BQU87UUFDM0UsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLHFCQUFxQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUN6QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBRUQsK0JBQStCLEtBQWdCLEVBQUUsT0FBZ0I7SUFD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SUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3pELDJCQUFvQixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUQsMkJBQW9CLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7SUFDSCxDQUFDO0lBR0QsTUFBTSxDQUFDLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBL0NELG9EQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbm5lbCwgQ09MT1IsIE5vblBvc2l0aW9uU2NhbGVDaGFubmVsLCBPUEFDSVRZLCBTSEFQRSwgU0laRX0gZnJvbSAnLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge3RpdGxlIGFzIGZpZWxkRGVmVGl0bGV9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TGVnZW5kLCBMRUdFTkRfUFJPUEVSVElFUywgVkdfTEVHRU5EX1BST1BFUlRJRVN9IGZyb20gJy4uLy4uL2xlZ2VuZCc7XG5pbXBvcnQge2RlbGV0ZU5lc3RlZFByb3BlcnR5LCBrZXlzfSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7VmdMZWdlbmQsIFZnTGVnZW5kRW5jb2RlfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5pbXBvcnQge2dldFNwZWNpZmllZE9yRGVmYXVsdFZhbHVlLCBudW1iZXJGb3JtYXQsIHRpdGxlTWVyZ2VyfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHtpc1VuaXRNb2RlbCwgTW9kZWx9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7cGFyc2VHdWlkZVJlc29sdmV9IGZyb20gJy4uL3Jlc29sdmUnO1xuaW1wb3J0IHtFeHBsaWNpdCwgbWFrZUltcGxpY2l0fSBmcm9tICcuLi9zcGxpdCc7XG5pbXBvcnQge2RlZmF1bHRUaWVCcmVha2VyLCBtZXJnZVZhbHVlc1dpdGhFeHBsaWNpdH0gZnJvbSAnLi4vc3BsaXQnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHtMZWdlbmRDb21wb25lbnQsIExlZ2VuZENvbXBvbmVudEluZGV4fSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBlbmNvZGUgZnJvbSAnLi9lbmNvZGUnO1xuaW1wb3J0ICogYXMgcHJvcGVydGllcyBmcm9tICcuL3Byb3BlcnRpZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxlZ2VuZChtb2RlbDogTW9kZWwpIHtcbiAgaWYgKGlzVW5pdE1vZGVsKG1vZGVsKSkge1xuICAgIG1vZGVsLmNvbXBvbmVudC5sZWdlbmRzID0gcGFyc2VVbml0TGVnZW5kKG1vZGVsKTtcbiAgfSBlbHNlIHtcbiAgICBtb2RlbC5jb21wb25lbnQubGVnZW5kcyA9IHBhcnNlTm9uVW5pdExlZ2VuZChtb2RlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VVbml0TGVnZW5kKG1vZGVsOiBVbml0TW9kZWwpOiBMZWdlbmRDb21wb25lbnRJbmRleCB7XG4gIHJldHVybiBbQ09MT1IsIFNJWkUsIFNIQVBFLCBPUEFDSVRZXS5yZWR1Y2UoZnVuY3Rpb24obGVnZW5kQ29tcG9uZW50LCBjaGFubmVsKSB7XG4gICAgaWYgKG1vZGVsLmxlZ2VuZChjaGFubmVsKSkge1xuICAgICAgbGVnZW5kQ29tcG9uZW50W2NoYW5uZWxdID0gcGFyc2VMZWdlbmRGb3JDaGFubmVsKG1vZGVsLCBjaGFubmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZ2VuZENvbXBvbmVudDtcbiAgfSwge30pO1xufVxuXG5mdW5jdGlvbiBnZXRMZWdlbmREZWZXaXRoU2NhbGUobW9kZWw6IFVuaXRNb2RlbCwgY2hhbm5lbDogQ2hhbm5lbCk6IFZnTGVnZW5kIHtcbiAgLy8gRm9yIGJpbm5lZCBmaWVsZCB3aXRoIGNvbnRpbnVvdXMgc2NhbGUsIHVzZSBhIHNwZWNpYWwgc2NhbGUgc28gd2UgY2FuIG92ZXJycmlkZSB0aGUgbWFyayBwcm9wcyBhbmQgbGFiZWxzXG4gIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgIGNhc2UgQ09MT1I6XG4gICAgICBjb25zdCBzY2FsZSA9IG1vZGVsLnNjYWxlTmFtZShDT0xPUik7XG4gICAgICByZXR1cm4gbW9kZWwubWFya0RlZi5maWxsZWQgPyB7ZmlsbDogc2NhbGV9IDoge3N0cm9rZTogc2NhbGV9O1xuICAgIGNhc2UgU0laRTpcbiAgICAgIHJldHVybiB7c2l6ZTogbW9kZWwuc2NhbGVOYW1lKFNJWkUpfTtcbiAgICBjYXNlIFNIQVBFOlxuICAgICAgcmV0dXJuIHtzaGFwZTogbW9kZWwuc2NhbGVOYW1lKFNIQVBFKX07XG4gICAgY2FzZSBPUEFDSVRZOlxuICAgICAgcmV0dXJuIHtvcGFjaXR5OiBtb2RlbC5zY2FsZU5hbWUoT1BBQ0lUWSl9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMZWdlbmRGb3JDaGFubmVsKG1vZGVsOiBVbml0TW9kZWwsIGNoYW5uZWw6IE5vblBvc2l0aW9uU2NhbGVDaGFubmVsKTogTGVnZW5kQ29tcG9uZW50IHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKTtcbiAgY29uc3QgbGVnZW5kID0gbW9kZWwubGVnZW5kKGNoYW5uZWwpO1xuXG4gIGNvbnN0IGxlZ2VuZENtcHQgPSBuZXcgTGVnZW5kQ29tcG9uZW50KHt9LCBnZXRMZWdlbmREZWZXaXRoU2NhbGUobW9kZWwsIGNoYW5uZWwpKTtcblxuICBMRUdFTkRfUFJPUEVSVElFUy5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRQcm9wZXJ0eShwcm9wZXJ0eSwgbGVnZW5kLCBjaGFubmVsLCBtb2RlbCk7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGV4cGxpY2l0ID0gcHJvcGVydHkgPT09ICd2YWx1ZXMnID9cbiAgICAgICAgISFsZWdlbmQudmFsdWVzIDogIC8vIHNwZWNpZmllZCBsZWdlbmQudmFsdWVzIGlzIGFscmVhZHkgcmVzcGVjdGVkLCBidXQgbWF5IGdldCB0cmFuc2Zvcm1lZC5cbiAgICAgICAgdmFsdWUgPT09IGxlZ2VuZFtwcm9wZXJ0eV07XG4gICAgICBpZiAoZXhwbGljaXQgfHwgbW9kZWwuY29uZmlnLmxlZ2VuZFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsZWdlbmRDbXB0LnNldChwcm9wZXJ0eSwgdmFsdWUsIGV4cGxpY2l0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIDIpIEFkZCBtYXJrIHByb3BlcnR5IGRlZmluaXRpb24gZ3JvdXBzXG4gIGNvbnN0IGxlZ2VuZEVuY29kaW5nID0gbGVnZW5kLmVuY29kaW5nIHx8IHt9O1xuICBjb25zdCBsZWdlbmRFbmNvZGUgPSBbJ2xhYmVscycsICdsZWdlbmQnLCAndGl0bGUnLCAnc3ltYm9scycsICdncmFkaWVudCddLnJlZHVjZSgoZTogVmdMZWdlbmRFbmNvZGUsIHBhcnQpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGVuY29kZVtwYXJ0XSA/XG4gICAgICAvLyBUT0RPOiByZXBsYWNlIGxlZ2VuZENtcHQgd2l0aCB0eXBlIGlzIHN1ZmZpY2llbnRcbiAgICAgIGVuY29kZVtwYXJ0XShmaWVsZERlZiwgbGVnZW5kRW5jb2RpbmdbcGFydF0sIG1vZGVsLCBjaGFubmVsLCBsZWdlbmRDbXB0LmdldCgndHlwZScpKSA6IC8vIGFwcGx5IHJ1bGVcbiAgICAgIGxlZ2VuZEVuY29kaW5nW3BhcnRdOyAvLyBubyBydWxlIC0tIGp1c3QgZGVmYXVsdCB2YWx1ZXNcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBrZXlzKHZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICBlW3BhcnRdID0ge3VwZGF0ZTogdmFsdWV9O1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfSwge30gYXMgVmdMZWdlbmRFbmNvZGUpO1xuXG4gIGlmIChrZXlzKGxlZ2VuZEVuY29kZSkubGVuZ3RoID4gMCkge1xuICAgIGxlZ2VuZENtcHQuc2V0KCdlbmNvZGUnLCBsZWdlbmRFbmNvZGUsICEhbGVnZW5kLmVuY29kaW5nKTtcbiAgfVxuXG4gIHJldHVybiBsZWdlbmRDbXB0O1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eShwcm9wZXJ0eToga2V5b2YgKExlZ2VuZCB8IFZnTGVnZW5kKSwgc3BlY2lmaWVkTGVnZW5kOiBMZWdlbmQsIGNoYW5uZWw6IE5vblBvc2l0aW9uU2NhbGVDaGFubmVsLCBtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IGZpZWxkRGVmID0gbW9kZWwuZmllbGREZWYoY2hhbm5lbCk7XG5cbiAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgIGNhc2UgJ2Zvcm1hdCc6XG4gICAgICAvLyBXZSBkb24ndCBpbmNsdWRlIHRlbXBvcmFsIGZpZWxkIGhlcmUgYXMgd2UgYXBwbHkgZm9ybWF0IGluIGVuY29kZSBibG9ja1xuICAgICAgcmV0dXJuIG51bWJlckZvcm1hdChmaWVsZERlZiwgc3BlY2lmaWVkTGVnZW5kLmZvcm1hdCwgbW9kZWwuY29uZmlnKTtcbiAgICBjYXNlICd0aXRsZSc6XG4gICAgICByZXR1cm4gZ2V0U3BlY2lmaWVkT3JEZWZhdWx0VmFsdWUoc3BlY2lmaWVkTGVnZW5kLnRpdGxlLCBmaWVsZERlZlRpdGxlKGZpZWxkRGVmLCBtb2RlbC5jb25maWcpKTtcbiAgICBjYXNlICd2YWx1ZXMnOlxuICAgICAgcmV0dXJuIHByb3BlcnRpZXMudmFsdWVzKHNwZWNpZmllZExlZ2VuZCk7XG4gICAgY2FzZSAndHlwZSc6XG4gICAgICByZXR1cm4gZ2V0U3BlY2lmaWVkT3JEZWZhdWx0VmFsdWUoc3BlY2lmaWVkTGVnZW5kLnR5cGUsIHByb3BlcnRpZXMudHlwZShmaWVsZERlZi50eXBlLCBjaGFubmVsLCBtb2RlbC5nZXRTY2FsZUNvbXBvbmVudChjaGFubmVsKS5nZXQoJ3R5cGUnKSkpO1xuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gc3BlY2lmaWVkIHByb3BlcnR5LlxuICByZXR1cm4gc3BlY2lmaWVkTGVnZW5kW3Byb3BlcnR5XTtcbn1cblxuZnVuY3Rpb24gcGFyc2VOb25Vbml0TGVnZW5kKG1vZGVsOiBNb2RlbCkge1xuICBjb25zdCB7bGVnZW5kcywgcmVzb2x2ZX0gPSBtb2RlbC5jb21wb25lbnQ7XG5cbiAgZm9yIChjb25zdCBjaGlsZCBvZiBtb2RlbC5jaGlsZHJlbikge1xuICAgIHBhcnNlTGVnZW5kKGNoaWxkKTtcblxuICAgIGtleXMoY2hpbGQuY29tcG9uZW50LmxlZ2VuZHMpLmZvckVhY2goKGNoYW5uZWw6IE5vblBvc2l0aW9uU2NhbGVDaGFubmVsKSA9PiB7XG4gICAgICByZXNvbHZlLmxlZ2VuZFtjaGFubmVsXSA9IHBhcnNlR3VpZGVSZXNvbHZlKG1vZGVsLmNvbXBvbmVudC5yZXNvbHZlLCBjaGFubmVsKTtcblxuICAgICAgaWYgKHJlc29sdmUubGVnZW5kW2NoYW5uZWxdID09PSAnc2hhcmVkJykge1xuICAgICAgICAvLyBJZiB0aGUgcmVzb2x2ZSBzYXlzIHNoYXJlZCAoYW5kIGhhcyBub3QgYmVlbiBvdmVycmlkZGVuKVxuICAgICAgICAvLyBXZSB3aWxsIHRyeSB0byBtZXJnZSBhbmQgc2VlIGlmIHRoZXJlIGlzIGEgY29uZmxpY3RcblxuICAgICAgICBsZWdlbmRzW2NoYW5uZWxdID0gbWVyZ2VMZWdlbmRDb21wb25lbnQobGVnZW5kc1tjaGFubmVsXSwgY2hpbGQuY29tcG9uZW50LmxlZ2VuZHNbY2hhbm5lbF0pO1xuXG4gICAgICAgIGlmICghbGVnZW5kc1tjaGFubmVsXSkge1xuICAgICAgICAgIC8vIElmIG1lcmdlIHJldHVybnMgbm90aGluZywgdGhlcmUgaXMgYSBjb25mbGljdCBzbyB3ZSBjYW5ub3QgbWFrZSB0aGUgbGVnZW5kIHNoYXJlZC5cbiAgICAgICAgICAvLyBUaHVzLCBtYXJrIGxlZ2VuZCBhcyBpbmRlcGVuZGVudCBhbmQgcmVtb3ZlIHRoZSBsZWdlbmQgY29tcG9uZW50LlxuICAgICAgICAgIHJlc29sdmUubGVnZW5kW2NoYW5uZWxdID0gJ2luZGVwZW5kZW50JztcbiAgICAgICAgICBkZWxldGUgbGVnZW5kc1tjaGFubmVsXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAga2V5cyhsZWdlbmRzKS5mb3JFYWNoKChjaGFubmVsOiBOb25Qb3NpdGlvblNjYWxlQ2hhbm5lbCkgPT4ge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgbW9kZWwuY2hpbGRyZW4pIHtcbiAgICAgIGlmICghY2hpbGQuY29tcG9uZW50LmxlZ2VuZHNbY2hhbm5lbF0pIHtcbiAgICAgICAgLy8gc2tpcCBpZiB0aGUgY2hpbGQgZG9lcyBub3QgaGF2ZSBhIHBhcnRpY3VsYXIgbGVnZW5kXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzb2x2ZS5sZWdlbmRbY2hhbm5lbF0gPT09ICdzaGFyZWQnKSB7XG4gICAgICAgIC8vIEFmdGVyIG1lcmdpbmcgc2hhcmVkIGxlZ2VuZCwgbWFrZSBzdXJlIHRvIHJlbW92ZSBsZWdlbmQgZnJvbSBjaGlsZFxuICAgICAgICBkZWxldGUgY2hpbGQuY29tcG9uZW50LmxlZ2VuZHNbY2hhbm5lbF07XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxlZ2VuZHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUxlZ2VuZENvbXBvbmVudChtZXJnZWRMZWdlbmQ6IExlZ2VuZENvbXBvbmVudCwgY2hpbGRMZWdlbmQ6IExlZ2VuZENvbXBvbmVudCkge1xuICBpZiAoIW1lcmdlZExlZ2VuZCkge1xuICAgIHJldHVybiBjaGlsZExlZ2VuZC5jbG9uZSgpO1xuICB9XG4gIGNvbnN0IG1lcmdlZE9yaWVudCA9IG1lcmdlZExlZ2VuZC5nZXRXaXRoRXhwbGljaXQoJ29yaWVudCcpO1xuICBjb25zdCBjaGlsZE9yaWVudCA9IGNoaWxkTGVnZW5kLmdldFdpdGhFeHBsaWNpdCgnb3JpZW50Jyk7XG5cblxuICBpZiAobWVyZ2VkT3JpZW50LmV4cGxpY2l0ICYmIGNoaWxkT3JpZW50LmV4cGxpY2l0ICYmIG1lcmdlZE9yaWVudC52YWx1ZSAhPT0gY2hpbGRPcmllbnQudmFsdWUpIHtcbiAgICAvLyBUT0RPOiB0aHJvdyB3YXJuaW5nIGlmIHJlc29sdmUgaXMgZXhwbGljaXQgKFdlIGRvbid0IGhhdmUgaW5mbyBhYm91dCBleHBsaWNpdC9pbXBsaWNpdCByZXNvbHZlIHlldC4pXG4gICAgLy8gQ2Fubm90IG1lcmdlIGR1ZSB0byBpbmNvbnNpc3RlbnQgb3JpZW50XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBsZXQgdHlwZU1lcmdlZCA9IGZhbHNlO1xuICAvLyBPdGhlcndpc2UsIGxldCdzIG1lcmdlXG4gIGZvciAoY29uc3QgcHJvcCBvZiBWR19MRUdFTkRfUFJPUEVSVElFUykge1xuICAgIGNvbnN0IG1lcmdlZFZhbHVlV2l0aEV4cGxpY2l0ID0gbWVyZ2VWYWx1ZXNXaXRoRXhwbGljaXQ8VmdMZWdlbmQsIGFueT4oXG4gICAgICBtZXJnZWRMZWdlbmQuZ2V0V2l0aEV4cGxpY2l0KHByb3ApLFxuICAgICAgY2hpbGRMZWdlbmQuZ2V0V2l0aEV4cGxpY2l0KHByb3ApLFxuICAgICAgcHJvcCwgJ2xlZ2VuZCcsXG5cbiAgICAgIC8vIFRpZSBicmVha2VyIGZ1bmN0aW9uXG4gICAgICAodjE6IEV4cGxpY2l0PGFueT4sIHYyOiBFeHBsaWNpdDxhbnk+KTogYW55ID0+IHtcbiAgICAgICAgc3dpdGNoIChwcm9wKSB7XG4gICAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgICAgcmV0dXJuIHRpdGxlTWVyZ2VyKHYxLCB2Mik7XG4gICAgICAgICAgY2FzZSAndHlwZSc6XG4gICAgICAgICAgICAvLyBUaGVyZSBhcmUgb25seSB0d28gdHlwZXMuIElmIHdlIGhhdmUgZGlmZmVyZW50IHR5cGVzLCB0aGVuIHByZWZlciBzeW1ib2wgb3ZlciBncmFkaWVudC5cbiAgICAgICAgICAgIHR5cGVNZXJnZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIG1ha2VJbXBsaWNpdCgnc3ltYm9sJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRUaWVCcmVha2VyPFZnTGVnZW5kLCBhbnk+KHYxLCB2MiwgcHJvcCwgJ2xlZ2VuZCcpO1xuICAgICAgfVxuICAgICk7XG4gICAgbWVyZ2VkTGVnZW5kLnNldFdpdGhFeHBsaWNpdChwcm9wLCBtZXJnZWRWYWx1ZVdpdGhFeHBsaWNpdCk7XG4gIH1cbiAgaWYgKHR5cGVNZXJnZWQpIHtcbiAgICBpZigoKG1lcmdlZExlZ2VuZC5pbXBsaWNpdCB8fCB7fSkuZW5jb2RlIHx8IHt9KS5ncmFkaWVudCkge1xuICAgICAgZGVsZXRlTmVzdGVkUHJvcGVydHkobWVyZ2VkTGVnZW5kLmltcGxpY2l0LCBbJ2VuY29kZScsICdncmFkaWVudCddKTtcbiAgICB9XG4gICAgaWYgKCgobWVyZ2VkTGVnZW5kLmV4cGxpY2l0IHx8IHt9KS5lbmNvZGUgfHwge30pLmdyYWRpZW50KSB7XG4gICAgICBkZWxldGVOZXN0ZWRQcm9wZXJ0eShtZXJnZWRMZWdlbmQuZXhwbGljaXQsIFsnZW5jb2RlJywgJ2dyYWRpZW50J10pO1xuICAgIH1cbiAgfVxuXG5cbiAgcmV0dXJuIG1lcmdlZExlZ2VuZDtcbn1cblxuIl19
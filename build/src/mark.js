"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var Mark;
(function (Mark) {
    Mark.AREA = 'area';
    Mark.BAR = 'bar';
    Mark.LINE = 'line';
    Mark.POINT = 'point';
    Mark.RECT = 'rect';
    Mark.RULE = 'rule';
    Mark.TEXT = 'text';
    Mark.TICK = 'tick';
    Mark.CIRCLE = 'circle';
    Mark.SQUARE = 'square';
})(Mark = exports.Mark || (exports.Mark = {}));
exports.AREA = Mark.AREA;
exports.BAR = Mark.BAR;
exports.LINE = Mark.LINE;
exports.POINT = Mark.POINT;
exports.TEXT = Mark.TEXT;
exports.TICK = Mark.TICK;
exports.RECT = Mark.RECT;
exports.RULE = Mark.RULE;
exports.CIRCLE = Mark.CIRCLE;
exports.SQUARE = Mark.SQUARE;
// Using mapped type to declare index, ensuring we always have all marks when we add more.
var MARK_INDEX = {
    area: 1,
    bar: 1,
    line: 1,
    point: 1,
    text: 1,
    tick: 1,
    rect: 1,
    rule: 1,
    circle: 1,
    square: 1
};
function isMark(m) {
    return !!MARK_INDEX[m];
}
exports.isMark = isMark;
exports.PRIMITIVE_MARKS = util_1.flagKeys(MARK_INDEX);
function isMarkDef(mark) {
    return mark['type'];
}
exports.isMarkDef = isMarkDef;
var PRIMITIVE_MARK_INDEX = util_1.toSet(exports.PRIMITIVE_MARKS);
function isPrimitiveMark(mark) {
    var markType = isMarkDef(mark) ? mark.type : mark;
    return markType in PRIMITIVE_MARK_INDEX;
}
exports.isPrimitiveMark = isPrimitiveMark;
exports.STROKE_CONFIG = ['stroke', 'strokeWidth',
    'strokeDash', 'strokeDashOffset', 'strokeOpacity'];
exports.FILL_CONFIG = ['fill', 'fillOpacity'];
exports.FILL_STROKE_CONFIG = [].concat(exports.STROKE_CONFIG, exports.FILL_CONFIG);
exports.VL_ONLY_MARK_CONFIG_PROPERTIES = ['filled', 'color'];
exports.VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
    bar: ['binSpacing', 'continuousBandSize', 'discreteBandSize'],
    text: ['shortTimeLabels'],
    tick: ['bandSize', 'thickness']
};
exports.defaultMarkConfig = {
    color: '#4c78a8',
};
exports.defaultBarConfig = {
    binSpacing: 1,
    continuousBandSize: 5
};
exports.defaultTickConfig = {
    thickness: 1
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYXJrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0JBQXVDO0FBR3ZDLElBQWlCLElBQUksQ0FXcEI7QUFYRCxXQUFpQixJQUFJO0lBQ04sU0FBSSxHQUFXLE1BQU0sQ0FBQztJQUN0QixRQUFHLEdBQVUsS0FBSyxDQUFDO0lBQ25CLFNBQUksR0FBVyxNQUFNLENBQUM7SUFDdEIsVUFBSyxHQUFZLE9BQU8sQ0FBQztJQUN6QixTQUFJLEdBQVcsTUFBTSxDQUFDO0lBQ3RCLFNBQUksR0FBVyxNQUFNLENBQUM7SUFDdEIsU0FBSSxHQUFXLE1BQU0sQ0FBQztJQUN0QixTQUFJLEdBQVcsTUFBTSxDQUFDO0lBQ3RCLFdBQU0sR0FBYSxRQUFRLENBQUM7SUFDNUIsV0FBTSxHQUFhLFFBQVEsQ0FBQztBQUMzQyxDQUFDLEVBWGdCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQVdwQjtBQVFZLFFBQUEsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDakIsUUFBQSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNmLFFBQUEsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDakIsUUFBQSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNuQixRQUFBLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ2pCLFFBQUEsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDakIsUUFBQSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNqQixRQUFBLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBRWpCLFFBQUEsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDckIsUUFBQSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUVsQywwRkFBMEY7QUFDMUYsSUFBTSxVQUFVLEdBQXFCO0lBQ25DLElBQUksRUFBRSxDQUFDO0lBQ1AsR0FBRyxFQUFFLENBQUM7SUFDTixJQUFJLEVBQUUsQ0FBQztJQUNQLEtBQUssRUFBRSxDQUFDO0lBQ1IsSUFBSSxFQUFFLENBQUM7SUFDUCxJQUFJLEVBQUUsQ0FBQztJQUNQLElBQUksRUFBRSxDQUFDO0lBQ1AsSUFBSSxFQUFFLENBQUM7SUFDUCxNQUFNLEVBQUUsQ0FBQztJQUNULE1BQU0sRUFBRSxDQUFDO0NBQ1YsQ0FBQztBQUVGLGdCQUF1QixDQUFTO0lBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFGRCx3QkFFQztBQUVZLFFBQUEsZUFBZSxHQUFHLGVBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQTBEcEQsbUJBQTBCLElBQWE7SUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBRkQsOEJBRUM7QUFFRCxJQUFNLG9CQUFvQixHQUFHLFlBQUssQ0FBQyx1QkFBZSxDQUFDLENBQUM7QUFFcEQseUJBQWdDLElBQXVEO0lBQ3JGLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxRQUFRLElBQUksb0JBQW9CLENBQUM7QUFDMUMsQ0FBQztBQUhELDBDQUdDO0FBRVksUUFBQSxhQUFhLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYTtJQUNuRCxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFeEMsUUFBQSxXQUFXLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFFdEMsUUFBQSxrQkFBa0IsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFhLEVBQUUsbUJBQVcsQ0FBQyxDQUFDO0FBRTNELFFBQUEsOEJBQThCLEdBQXlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTNFLFFBQUEsMkNBQTJDLEdBRXBEO0lBQ0YsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDO0lBQzdELElBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ3pCLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUM7Q0FDaEMsQ0FBQztBQUlXLFFBQUEsaUJBQWlCLEdBQWU7SUFDM0MsS0FBSyxFQUFFLFNBQVM7Q0FDakIsQ0FBQztBQWdFVyxRQUFBLGdCQUFnQixHQUFjO0lBQ3pDLFVBQVUsRUFBRSxDQUFDO0lBQ2Isa0JBQWtCLEVBQUUsQ0FBQztDQUN0QixDQUFDO0FBNEJXLFFBQUEsaUJBQWlCLEdBQWU7SUFDM0MsU0FBUyxFQUFFLENBQUM7Q0FDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb3NpdGVNYXJrLCBDb21wb3NpdGVNYXJrRGVmfSBmcm9tICcuL2NvbXBvc2l0ZW1hcmsvaW5kZXgnO1xuaW1wb3J0IHtmbGFnS2V5cywgdG9TZXR9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1ZnTWFya0NvbmZpZ30gZnJvbSAnLi92ZWdhLnNjaGVtYSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWFyayB7XG4gIGV4cG9ydCBjb25zdCBBUkVBOiAnYXJlYScgPSAnYXJlYSc7XG4gIGV4cG9ydCBjb25zdCBCQVI6ICdiYXInID0gJ2Jhcic7XG4gIGV4cG9ydCBjb25zdCBMSU5FOiAnbGluZScgPSAnbGluZSc7XG4gIGV4cG9ydCBjb25zdCBQT0lOVDogJ3BvaW50JyA9ICdwb2ludCc7XG4gIGV4cG9ydCBjb25zdCBSRUNUOiAncmVjdCcgPSAncmVjdCc7XG4gIGV4cG9ydCBjb25zdCBSVUxFOiAncnVsZScgPSAncnVsZSc7XG4gIGV4cG9ydCBjb25zdCBURVhUOiAndGV4dCcgPSAndGV4dCc7XG4gIGV4cG9ydCBjb25zdCBUSUNLOiAndGljaycgPSAndGljayc7XG4gIGV4cG9ydCBjb25zdCBDSVJDTEU6ICdjaXJjbGUnID0gJ2NpcmNsZSc7XG4gIGV4cG9ydCBjb25zdCBTUVVBUkU6ICdzcXVhcmUnID0gJ3NxdWFyZSc7XG59XG5cbi8qKlxuICogQWxsIHR5cGVzIG9mIHByaW1pdGl2ZSBtYXJrcy5cbiAqL1xuZXhwb3J0IHR5cGUgTWFyayA9IHR5cGVvZiBNYXJrLkFSRUEgfCB0eXBlb2YgTWFyay5CQVIgfCB0eXBlb2YgTWFyay5MSU5FIHwgdHlwZW9mIE1hcmsuUE9JTlQgfCB0eXBlb2YgTWFyay5URVhUIHwgdHlwZW9mIE1hcmsuVElDSyB8IHR5cGVvZiBNYXJrLlJFQ1QgfCB0eXBlb2YgTWFyay5SVUxFIHwgdHlwZW9mIE1hcmsuQ0lSQ0xFIHwgdHlwZW9mIE1hcmsuU1FVQVJFO1xuXG5cbmV4cG9ydCBjb25zdCBBUkVBID0gTWFyay5BUkVBO1xuZXhwb3J0IGNvbnN0IEJBUiA9IE1hcmsuQkFSO1xuZXhwb3J0IGNvbnN0IExJTkUgPSBNYXJrLkxJTkU7XG5leHBvcnQgY29uc3QgUE9JTlQgPSBNYXJrLlBPSU5UO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSBNYXJrLlRFWFQ7XG5leHBvcnQgY29uc3QgVElDSyA9IE1hcmsuVElDSztcbmV4cG9ydCBjb25zdCBSRUNUID0gTWFyay5SRUNUO1xuZXhwb3J0IGNvbnN0IFJVTEUgPSBNYXJrLlJVTEU7XG5cbmV4cG9ydCBjb25zdCBDSVJDTEUgPSBNYXJrLkNJUkNMRTtcbmV4cG9ydCBjb25zdCBTUVVBUkUgPSBNYXJrLlNRVUFSRTtcblxuLy8gVXNpbmcgbWFwcGVkIHR5cGUgdG8gZGVjbGFyZSBpbmRleCwgZW5zdXJpbmcgd2UgYWx3YXlzIGhhdmUgYWxsIG1hcmtzIHdoZW4gd2UgYWRkIG1vcmUuXG5jb25zdCBNQVJLX0lOREVYOiB7W00gaW4gTWFya106IDF9ID0ge1xuICBhcmVhOiAxLFxuICBiYXI6IDEsXG4gIGxpbmU6IDEsXG4gIHBvaW50OiAxLFxuICB0ZXh0OiAxLFxuICB0aWNrOiAxLFxuICByZWN0OiAxLFxuICBydWxlOiAxLFxuICBjaXJjbGU6IDEsXG4gIHNxdWFyZTogMVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTWFyayhtOiBzdHJpbmcpOiBtIGlzIE1hcmsge1xuICByZXR1cm4gISFNQVJLX0lOREVYW21dO1xufVxuXG5leHBvcnQgY29uc3QgUFJJTUlUSVZFX01BUktTID0gZmxhZ0tleXMoTUFSS19JTkRFWCk7XG5cblxuZXhwb3J0IGludGVyZmFjZSBNYXJrQ29uZmlnIGV4dGVuZHMgVmdNYXJrQ29uZmlnIHtcbiAgLy8gLS0tLS0tLS0tLSBDb2xvciAtLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBtYXJrJ3MgY29sb3Igc2hvdWxkIGJlIHVzZWQgYXMgZmlsbCBjb2xvciBpbnN0ZWFkIG9mIHN0cm9rZSBjb2xvci5cbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIGB0cnVlYCBmb3IgYWxsIG1hcmtzIGV4Y2VwdCBgcG9pbnRgIGFuZCBgZmFsc2VgIGZvciBgcG9pbnRgLlxuICAgKlxuICAgKiBfX0FwcGxpY2FibGUgZm9yOl9fIGBiYXJgLCBgcG9pbnRgLCBgY2lyY2xlYCwgYHNxdWFyZWAsIGFuZCBgYXJlYWAgbWFya3MuXG4gICAqXG4gICAqIF9fTm90ZTpfXyBUaGlzIHByb3BlcnR5IGNhbm5vdCBiZSB1c2VkIGluIGEgW3N0eWxlIGNvbmZpZ10obWFyay5odG1sI3N0eWxlLWNvbmZpZykuXG4gICAqXG4gICAqL1xuICBmaWxsZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGNvbG9yLiAgTm90ZSB0aGF0IGBmaWxsYCBhbmQgYHN0cm9rZWAgaGF2ZSBoaWdoZXIgcHJlY2VkZW5jZSB0aGFuIGBjb2xvcmAgYW5kIHdpbGwgb3ZlcnJpZGUgYGNvbG9yYC5cbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIDxzcGFuIHN0eWxlPVwiY29sb3I6ICM0NjgyYjQ7XCI+JiM5NjMyOzwvc3Bhbj4gYFwiIzQ2ODJiNFwiYFxuICAgKlxuICAgKiBfX05vdGU6X18gVGhpcyBwcm9wZXJ0eSBjYW5ub3QgYmUgdXNlZCBpbiBhIFtzdHlsZSBjb25maWddKG1hcmsuaHRtbCNzdHlsZS1jb25maWcpLlxuICAgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFya0RlZiBleHRlbmRzIE1hcmtDb25maWcge1xuICAvKipcbiAgICogVGhlIG1hcmsgdHlwZS5cbiAgICogT25lIG9mIGBcImJhclwiYCwgYFwiY2lyY2xlXCJgLCBgXCJzcXVhcmVcImAsIGBcInRpY2tcImAsIGBcImxpbmVcImAsXG4gICAqIGBcImFyZWFcImAsIGBcInBvaW50XCJgLCBgXCJydWxlXCJgLCBhbmQgYFwidGV4dFwiYC5cbiAgICovXG4gIHR5cGU6IE1hcms7XG5cbiAgLyoqXG4gICAqXG4gICAqIEEgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgaW5kaWNhdGluZyB0aGUgbmFtZSBvZiBjdXN0b20gc3R5bGVzIHRvIGFwcGx5IHRvIHRoZSBtYXJrLiBBIHN0eWxlIGlzIGEgbmFtZWQgY29sbGVjdGlvbiBvZiBtYXJrIHByb3BlcnR5IGRlZmF1bHRzIGRlZmluZWQgd2l0aGluIHRoZSBbc3R5bGUgY29uZmlndXJhdGlvbl0obWFyay5odG1sI3N0eWxlLWNvbmZpZykuIElmIHN0eWxlIGlzIGFuIGFycmF5LCBsYXRlciBzdHlsZXMgd2lsbCBvdmVycmlkZSBlYXJsaWVyIHN0eWxlcy4gQW55IFttYXJrIHByb3BlcnRpZXNdKGVuY29kaW5nLmh0bWwjbWFyay1wcm9wKSBleHBsaWNpdGx5IGRlZmluZWQgd2l0aGluIHRoZSBgZW5jb2RpbmdgIHdpbGwgb3ZlcnJpZGUgYSBzdHlsZSBkZWZhdWx0LlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gVGhlIG1hcmsncyBuYW1lLiAgRm9yIGV4YW1wbGUsIGEgYmFyIG1hcmsgd2lsbCBoYXZlIHN0eWxlIGBcImJhclwiYCBieSBkZWZhdWx0LlxuICAgKiBfX05vdGU6X18gQW55IHNwZWNpZmllZCBzdHlsZSB3aWxsIGF1Z21lbnQgdGhlIGRlZmF1bHQgc3R5bGUuIEZvciBleGFtcGxlLCBhIGJhciBtYXJrIHdpdGggYFwic3R5bGVcIjogXCJmb29cImAgd2lsbCByZWNlaXZlIGZyb20gYGNvbmZpZy5zdHlsZS5iYXJgIGFuZCBgY29uZmlnLnN0eWxlLmZvb2AgKHRoZSBzcGVjaWZpZWQgc3R5bGUgYFwiZm9vXCJgIGhhcyBoaWdoZXIgcHJlY2VkZW5jZSkuXG4gICAqL1xuICBzdHlsZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGEgbWFyayBiZSBjbGlwcGVkIHRvIHRoZSBlbmNsb3NpbmcgZ3JvdXDigJlzIHdpZHRoIGFuZCBoZWlnaHQuXG4gICAqL1xuICBjbGlwPzogYm9vbGVhbjtcbn1cblxuLyoqIEBoaWRlICovXG5leHBvcnQgdHlwZSBIaWRkZW5Db21wb3NpdGUgPSBDb21wb3NpdGVNYXJrIHwgQ29tcG9zaXRlTWFya0RlZjtcblxuZXhwb3J0IHR5cGUgQW55TWFyayA9XG4gIEhpZGRlbkNvbXBvc2l0ZSB8XG4gIE1hcmsgfFxuICBNYXJrRGVmO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNNYXJrRGVmKG1hcms6IEFueU1hcmspOiBtYXJrIGlzIChNYXJrRGVmIHwgQ29tcG9zaXRlTWFya0RlZikge1xuICByZXR1cm4gbWFya1sndHlwZSddO1xufVxuXG5jb25zdCBQUklNSVRJVkVfTUFSS19JTkRFWCA9IHRvU2V0KFBSSU1JVElWRV9NQVJLUyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZU1hcmsobWFyazogQ29tcG9zaXRlTWFyayB8IENvbXBvc2l0ZU1hcmtEZWYgfCBNYXJrIHwgTWFya0RlZik6IG1hcmsgaXMgTWFyayB7XG4gIGNvbnN0IG1hcmtUeXBlID0gaXNNYXJrRGVmKG1hcmspID8gbWFyay50eXBlIDogbWFyaztcbiAgcmV0dXJuIG1hcmtUeXBlIGluIFBSSU1JVElWRV9NQVJLX0lOREVYO1xufVxuXG5leHBvcnQgY29uc3QgU1RST0tFX0NPTkZJRyA9IFsnc3Ryb2tlJywgJ3N0cm9rZVdpZHRoJyxcbiAgJ3N0cm9rZURhc2gnLCAnc3Ryb2tlRGFzaE9mZnNldCcsICdzdHJva2VPcGFjaXR5J107XG5cbmV4cG9ydCBjb25zdCBGSUxMX0NPTkZJRyA9IFsnZmlsbCcsICdmaWxsT3BhY2l0eSddO1xuXG5leHBvcnQgY29uc3QgRklMTF9TVFJPS0VfQ09ORklHID0gW10uY29uY2F0KFNUUk9LRV9DT05GSUcsIEZJTExfQ09ORklHKTtcblxuZXhwb3J0IGNvbnN0IFZMX09OTFlfTUFSS19DT05GSUdfUFJPUEVSVElFUzogKGtleW9mIE1hcmtDb25maWcpW10gPSBbJ2ZpbGxlZCcsICdjb2xvciddO1xuXG5leHBvcnQgY29uc3QgVkxfT05MWV9NQVJLX1NQRUNJRklDX0NPTkZJR19QUk9QRVJUWV9JTkRFWDoge1xuICBbayBpbiAodHlwZW9mIFBSSU1JVElWRV9NQVJLU1swXSldPzogKGtleW9mIE1hcmtDb25maWdNaXhpbnNba10pW11cbn0gPSB7XG4gIGJhcjogWydiaW5TcGFjaW5nJywgJ2NvbnRpbnVvdXNCYW5kU2l6ZScsICdkaXNjcmV0ZUJhbmRTaXplJ10sXG4gIHRleHQ6IFsnc2hvcnRUaW1lTGFiZWxzJ10sXG4gIHRpY2s6IFsnYmFuZFNpemUnLCAndGhpY2tuZXNzJ11cbn07XG5cblxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE1hcmtDb25maWc6IE1hcmtDb25maWcgPSB7XG4gIGNvbG9yOiAnIzRjNzhhOCcsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtDb25maWdNaXhpbnMge1xuICAvKiogTWFyayBDb25maWcgKi9cbiAgbWFyaz86IE1hcmtDb25maWc7XG5cbiAgLy8gTUFSSy1TUEVDSUZJQyBDT05GSUdTXG4gIC8qKiBBcmVhLVNwZWNpZmljIENvbmZpZyAqL1xuICBhcmVhPzogTWFya0NvbmZpZztcblxuICAvKiogQmFyLVNwZWNpZmljIENvbmZpZyAqL1xuICBiYXI/OiBCYXJDb25maWc7XG5cbiAgLyoqIENpcmNsZS1TcGVjaWZpYyBDb25maWcgKi9cbiAgY2lyY2xlPzogTWFya0NvbmZpZztcblxuICAvKiogTGluZS1TcGVjaWZpYyBDb25maWcgKi9cbiAgbGluZT86IE1hcmtDb25maWc7XG5cbiAgLyoqIFBvaW50LVNwZWNpZmljIENvbmZpZyAqL1xuICBwb2ludD86IE1hcmtDb25maWc7XG5cbiAgLyoqIFJlY3QtU3BlY2lmaWMgQ29uZmlnICovXG4gIHJlY3Q/OiBNYXJrQ29uZmlnO1xuXG4gIC8qKiBSdWxlLVNwZWNpZmljIENvbmZpZyAqL1xuICBydWxlPzogTWFya0NvbmZpZztcblxuICAvKiogU3F1YXJlLVNwZWNpZmljIENvbmZpZyAqL1xuICBzcXVhcmU/OiBNYXJrQ29uZmlnO1xuXG4gIC8qKiBUZXh0LVNwZWNpZmljIENvbmZpZyAqL1xuICB0ZXh0PzogVGV4dENvbmZpZztcblxuICAvKiogVGljay1TcGVjaWZpYyBDb25maWcgKi9cbiAgdGljaz86IFRpY2tDb25maWc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFyQ29uZmlnIGV4dGVuZHMgTWFya0NvbmZpZyB7XG4gIC8qKlxuICAgKiBPZmZzZXQgYmV0d2VlbiBiYXIgZm9yIGJpbm5lZCBmaWVsZC4gIElkZWFsIHZhbHVlIGZvciB0aGlzIGlzIGVpdGhlciAwIChQcmVmZXJyZWQgYnkgc3RhdGlzdGljaWFucykgb3IgMSAoVmVnYS1MaXRlIERlZmF1bHQsIEQzIGV4YW1wbGUgc3R5bGUpLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gYDFgXG4gICAqXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIGJpblNwYWNpbmc/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBzaXplIG9mIHRoZSBiYXJzIG9uIGNvbnRpbnVvdXMgc2NhbGVzLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gYDVgXG4gICAqXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIGNvbnRpbnVvdXNCYW5kU2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGJhcnMuICBJZiB1bnNwZWNpZmllZCwgdGhlIGRlZmF1bHQgc2l6ZSBpcyAgYGJhbmRTaXplLTFgLFxuICAgKiB3aGljaCBwcm92aWRlcyAxIHBpeGVsIG9mZnNldCBiZXR3ZWVuIGJhcnMuXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIGRpc2NyZXRlQmFuZFNpemU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0QmFyQ29uZmlnOiBCYXJDb25maWcgPSB7XG4gIGJpblNwYWNpbmc6IDEsXG4gIGNvbnRpbnVvdXNCYW5kU2l6ZTogNVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0Q29uZmlnIGV4dGVuZHMgTWFya0NvbmZpZyB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG1vbnRoIG5hbWVzIGFuZCB3ZWVrZGF5IG5hbWVzIHNob3VsZCBiZSBhYmJyZXZpYXRlZC5cbiAgICovXG4gIHNob3J0VGltZUxhYmVscz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGlja0NvbmZpZyBleHRlbmRzIE1hcmtDb25maWcge1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSB0aWNrcy5cbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fICAyLzMgb2YgcmFuZ2VTdGVwLlxuICAgKiBAbWluaW11bSAwXG4gICAqL1xuICBiYW5kU2l6ZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhpY2tuZXNzIG9mIHRoZSB0aWNrIG1hcmsuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyAgYDFgXG4gICAqXG4gICAqIEBtaW5pbXVtIDBcbiAgICovXG4gIHRoaWNrbmVzcz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRUaWNrQ29uZmlnOiBUaWNrQ29uZmlnID0ge1xuICB0aGlja25lc3M6IDFcbn07XG4iXX0=
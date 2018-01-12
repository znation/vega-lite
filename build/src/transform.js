"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("./filter");
var logical_1 = require("./logical");
function isFilter(t) {
    return t['filter'] !== undefined;
}
exports.isFilter = isFilter;
function isLookup(t) {
    return t['lookup'] !== undefined;
}
exports.isLookup = isLookup;
function isCalculate(t) {
    return t['calculate'] !== undefined;
}
exports.isCalculate = isCalculate;
function isBin(t) {
    return !!t['bin'];
}
exports.isBin = isBin;
function isTimeUnit(t) {
    return t['timeUnit'] !== undefined;
}
exports.isTimeUnit = isTimeUnit;
function isAggregate(t) {
    return t['aggregate'] !== undefined;
}
exports.isAggregate = isAggregate;
function normalizeTransform(transform) {
    return transform.map(function (t) {
        if (isFilter(t)) {
            return {
                filter: logical_1.normalizeLogicalOperand(t.filter, filter_1.normalizeFilter)
            };
        }
        return t;
    });
}
exports.normalizeTransform = normalizeTransform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLG1DQUFpRDtBQUNqRCxxQ0FBa0U7QUFjbEUsa0JBQXlCLENBQVk7SUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxTQUFTLENBQUM7QUFDbkMsQ0FBQztBQUZELDRCQUVDO0FBeUhELGtCQUF5QixDQUFZO0lBQ25DLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQ25DLENBQUM7QUFGRCw0QkFFQztBQUVELHFCQUE0QixDQUFZO0lBQ3RDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQ3RDLENBQUM7QUFGRCxrQ0FFQztBQUVELGVBQXNCLENBQVk7SUFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUZELHNCQUVDO0FBRUQsb0JBQTJCLENBQVk7SUFDckMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTLENBQUM7QUFDckMsQ0FBQztBQUZELGdDQUVDO0FBRUQscUJBQTRCLENBQVk7SUFDdEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxTQUFTLENBQUM7QUFDdEMsQ0FBQztBQUZELGtDQUVDO0FBSUQsNEJBQW1DLFNBQXNCO0lBQ3ZELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztRQUNwQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQztnQkFDTCxNQUFNLEVBQUUsaUNBQXVCLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSx3QkFBZSxDQUFDO2FBQzNELENBQUM7UUFDSixDQUFDO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVRELGdEQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZ2dyZWdhdGVPcH0gZnJvbSAnLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IHtCaW5QYXJhbXN9IGZyb20gJy4vYmluJztcbmltcG9ydCB7RGF0YX0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7RmlsdGVyLCBub3JtYWxpemVGaWx0ZXJ9IGZyb20gJy4vZmlsdGVyJztcbmltcG9ydCB7TG9naWNhbE9wZXJhbmQsIG5vcm1hbGl6ZUxvZ2ljYWxPcGVyYW5kfSBmcm9tICcuL2xvZ2ljYWwnO1xuaW1wb3J0IHtUaW1lVW5pdH0gZnJvbSAnLi90aW1ldW5pdCc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJUcmFuc2Zvcm0ge1xuICAvKipcbiAgICogVGhlIGBmaWx0ZXJgIHByb3BlcnR5IG11c3QgYmUgZWl0aGVyICgxKSBhIGZpbHRlciBvYmplY3QgZm9yIFtlcXVhbC1maWx0ZXJzXShmaWx0ZXIuaHRtbCNlcXVhbGZpbHRlciksXG4gICAqIFtyYW5nZS1maWx0ZXJzXShmaWx0ZXIuaHRtbCNyYW5nZWZpbHRlciksIFtvbmUtb2YgZmlsdGVyc10oZmlsdGVyLmh0bWwjb25lb2ZmaWx0ZXIpLCBvciBbc2VsZWN0aW9uIGZpbHRlcnNdKGZpbHRlci5odG1sI3NlbGVjdGlvbmZpbHRlcik7XG4gICAqICgyKSBhIFtWZWdhIEV4cHJlc3Npb25dKGZpbHRlci5odG1sI2V4cHJlc3Npb24pIHN0cmluZyxcbiAgICogd2hlcmUgYGRhdHVtYCBjYW4gYmUgdXNlZCB0byByZWZlciB0byB0aGUgY3VycmVudCBkYXRhIG9iamVjdDsgb3IgKDMpIGFuIGFycmF5IG9mIGZpbHRlcnMgKGVpdGhlciBvYmplY3RzIG9yIGV4cHJlc3Npb24gc3RyaW5ncykgdGhhdCBtdXN0IGFsbCBiZSB0cnVlIGZvciBhIGRhdHVtIHRvIHBhc3MgdGhlIGZpbHRlciBhbmQgYmUgaW5jbHVkZWQuXG4gICAqL1xuICBmaWx0ZXI6IExvZ2ljYWxPcGVyYW5kPEZpbHRlcj47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZpbHRlcih0OiBUcmFuc2Zvcm0pOiB0IGlzIEZpbHRlclRyYW5zZm9ybSB7XG4gIHJldHVybiB0WydmaWx0ZXInXSAhPT0gdW5kZWZpbmVkO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsY3VsYXRlVHJhbnNmb3JtIHtcbiAgLyoqXG4gICAqIEEgc3RyaW5nIGNvbnRhaW5pbmcgYSBWZWdhIEV4cHJlc3Npb24uIFVzZSB0aGUgdmFyaWFibGUgYGRhdHVtYCB0byByZWZlciB0byB0aGUgY3VycmVudCBkYXRhIG9iamVjdC5cbiAgICovXG4gIGNhbGN1bGF0ZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZpZWxkIGZvciBzdG9yaW5nIHRoZSBjb21wdXRlZCBmb3JtdWxhIHZhbHVlLlxuICAgKi9cbiAgYXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCaW5UcmFuc2Zvcm0ge1xuICAvKipcbiAgICogQW4gb2JqZWN0IGluZGljYXRpbmcgYmluIHByb3BlcnRpZXMsIG9yIHNpbXBseSBgdHJ1ZWAgZm9yIHVzaW5nIGRlZmF1bHQgYmluIHBhcmFtZXRlcnMuXG4gICAqL1xuICBiaW46IGJvb2xlYW4gfCBCaW5QYXJhbXM7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRhIGZpZWxkIHRvIGJpbi5cbiAgICovXG4gIGZpZWxkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBvdXRwdXQgZmllbGRzIGF0IHdoaWNoIHRvIHdyaXRlIHRoZSBzdGFydCBhbmQgZW5kIGJpbiB2YWx1ZXMuXG4gICAqL1xuICBhczogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVVbml0VHJhbnNmb3JtIHtcbiAgLyoqXG4gICAqIFRoZSB0aW1lVW5pdC5cbiAgICovXG4gIHRpbWVVbml0OiBUaW1lVW5pdDtcblxuICAvKipcbiAgICogVGhlIGRhdGEgZmllbGQgdG8gYXBwbHkgdGltZSB1bml0LlxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG91dHB1dCBmaWVsZCB0byB3cml0ZSB0aGUgdGltZVVuaXQgdmFsdWUuXG4gICAqL1xuICBhczogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFnZ3JlZ2F0ZVRyYW5zZm9ybSB7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBvYmplY3RzIHRoYXQgZGVmaW5lIGZpZWxkcyB0byBhZ2dyZWdhdGUuXG4gICAqL1xuICBhZ2dyZWdhdGU6IEFnZ3JlZ2F0ZWRGaWVsZERlZltdO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0YSBmaWVsZHMgdG8gZ3JvdXAgYnkuIElmIG5vdCBzcGVjaWZpZWQsIGEgc2luZ2xlIGdyb3VwIGNvbnRhaW5pbmcgYWxsIGRhdGEgb2JqZWN0cyB3aWxsIGJlIHVzZWQuXG4gICAqL1xuICBncm91cGJ5Pzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWdncmVnYXRlZEZpZWxkRGVmIHtcbiAgLyoqXG4gICAqIFRoZSBhZ2dyZWdhdGlvbiBvcGVyYXRpb25zIHRvIGFwcGx5IHRvIHRoZSBmaWVsZHMsIHN1Y2ggYXMgc3VtLCBhdmVyYWdlIG9yIGNvdW50LlxuICAgKiBTZWUgdGhlIFtmdWxsIGxpc3Qgb2Ygc3VwcG9ydGVkIGFnZ3JlZ2F0aW9uIG9wZXJhdGlvbnNdKGh0dHBzOi8vdmVnYS5naXRodWIuaW8vdmVnYS1saXRlL2RvY3MvYWdncmVnYXRlLmh0bWwjb3BzKVxuICAgKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIG9wOiBBZ2dyZWdhdGVPcDtcblxuICAvKipcbiAgICogVGhlIGRhdGEgZmllbGQgZm9yIHdoaWNoIHRvIGNvbXB1dGUgYWdncmVnYXRlIGZ1bmN0aW9uLlxuICAgKi9cbiAgZmllbGQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG91dHB1dCBmaWVsZCBuYW1lcyB0byB1c2UgZm9yIGVhY2ggYWdncmVnYXRlZCBmaWVsZC5cbiAgICovXG4gIGFzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9va3VwRGF0YSB7XG4gIC8qKlxuICAgKiBTZWNvbmRhcnkgZGF0YSBzb3VyY2UgdG8gbG9va3VwIGluLlxuICAgKi9cbiAgZGF0YTogRGF0YTtcbiAgLyoqXG4gICAqIEtleSBpbiBkYXRhIHRvIGxvb2t1cC5cbiAgICovXG4gIGtleTogc3RyaW5nO1xuICAvKipcbiAgICogRmllbGRzIGluIGZvcmVpZ24gZGF0YSB0byBsb29rdXAuXG4gICAqIElmIG5vdCBzcGVjaWZpY2llZCwgdGhlIGVudGlyZSBvYmplY3QgaXMgcXVlcmllZC5cbiAgICovXG4gIGZpZWxkcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvb2t1cFRyYW5zZm9ybSB7XG4gIC8qKlxuICAgKiBLZXkgaW4gcHJpbWFyeSBkYXRhIHNvdXJjZS5cbiAgICovXG4gIGxvb2t1cDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTZWNvbmRhcnkgZGF0YSByZWZlcmVuY2UuXG4gICAqL1xuICBmcm9tOiBMb29rdXBEYXRhO1xuXG4gIC8qKlxuICAgKiBUaGUgZmllbGQgb3IgZmllbGRzIGZvciBzdG9yaW5nIHRoZSBjb21wdXRlZCBmb3JtdWxhIHZhbHVlLlxuICAgKiBJZiBgZnJvbS5maWVsZHNgIGlzIHNwZWNpZmllZCwgdGhlIHRyYW5zZm9ybSB3aWxsIHVzZSB0aGUgc2FtZSBuYW1lcyBmb3IgYGFzYC5cbiAgICogSWYgYGZyb20uZmllbGRzYCBpcyBub3Qgc3BlY2lmaWVkLCBgYXNgIGhhcyB0byBiZSBhIHN0cmluZyBhbmQgd2UgcHV0IHRoZSB3aG9sZSBvYmplY3QgaW50byB0aGUgZGF0YSB1bmRlciB0aGUgc3BlY2lmaWVkIG5hbWUuXG4gICAqL1xuICBhcz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSB0byB1c2UgaWYgbG9va3VwIGZhaWxzLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gYG51bGxgXG4gICAqL1xuICBkZWZhdWx0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb29rdXAodDogVHJhbnNmb3JtKTogdCBpcyBMb29rdXBUcmFuc2Zvcm0ge1xuICByZXR1cm4gdFsnbG9va3VwJ10gIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2FsY3VsYXRlKHQ6IFRyYW5zZm9ybSk6IHQgaXMgQ2FsY3VsYXRlVHJhbnNmb3JtIHtcbiAgcmV0dXJuIHRbJ2NhbGN1bGF0ZSddICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jpbih0OiBUcmFuc2Zvcm0pOiB0IGlzIEJpblRyYW5zZm9ybSB7XG4gIHJldHVybiAhIXRbJ2JpbiddO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaW1lVW5pdCh0OiBUcmFuc2Zvcm0pOiB0IGlzIFRpbWVVbml0VHJhbnNmb3JtIHtcbiAgcmV0dXJuIHRbJ3RpbWVVbml0J10gIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWdncmVnYXRlKHQ6IFRyYW5zZm9ybSk6IHQgaXMgQWdncmVnYXRlVHJhbnNmb3JtIHtcbiAgcmV0dXJuIHRbJ2FnZ3JlZ2F0ZSddICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCB0eXBlIFRyYW5zZm9ybSA9IEZpbHRlclRyYW5zZm9ybSB8IENhbGN1bGF0ZVRyYW5zZm9ybSB8IExvb2t1cFRyYW5zZm9ybSB8IEJpblRyYW5zZm9ybSB8IFRpbWVVbml0VHJhbnNmb3JtIHwgQWdncmVnYXRlVHJhbnNmb3JtO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVHJhbnNmb3JtKHRyYW5zZm9ybTogVHJhbnNmb3JtW10pIHtcbiAgcmV0dXJuIHRyYW5zZm9ybS5tYXAodCA9PiB7XG4gICAgaWYgKGlzRmlsdGVyKHQpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWx0ZXI6IG5vcm1hbGl6ZUxvZ2ljYWxPcGVyYW5kKHQuZmlsdGVyLCBub3JtYWxpemVGaWx0ZXIpXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdDtcbiAgfSk7XG59XG4iXX0=
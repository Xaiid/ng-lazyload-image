"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rect = (function () {
    function Rect(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    Rect.fromElement = function (element) {
        var _a = element.getBoundingClientRect(), left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom;
        return new Rect(left, top, right, bottom);
    };
    Rect.fromWindow = function (_window) {
        return new Rect(0, 0, _window.innerWidth, _window.innerHeight);
    };
    Rect.prototype.inflate = function (inflateBy) {
        this.left -= inflateBy;
        this.top -= inflateBy;
        this.right += inflateBy;
        this.bottom += inflateBy;
    };
    Rect.prototype.intersectsWith = function (rect) {
        return (rect.left < this.right) &&
            (this.left < rect.right) &&
            (rect.top < this.bottom) &&
            (this.top < rect.bottom);
    };
    Rect.prototype.getIntersectionWith = function (rect) {
        var left = Math.max(this.left, rect.left);
        var top = Math.max(this.top, rect.top);
        var right = Math.min(this.right, rect.right);
        var bottom = Math.min(this.bottom, rect.bottom);
        if (right >= left && bottom >= top) {
            return new Rect(left, top, right, bottom);
        }
        else {
            return Rect.empty;
        }
    };
    Rect.empty = new Rect(0, 0, 0, 0);
    return Rect;
}());
exports.Rect = Rect;
//# sourceMappingURL=rect.js.map
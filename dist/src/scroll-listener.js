"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/sampleTime");
require("rxjs/add/operator/share");
require("rxjs/add/observable/empty");
var Observable_1 = require("rxjs/Observable");
var scrollListeners = new WeakMap();
function sampleObservable(obs, scheduler) {
    return obs
        .sampleTime(100, scheduler)
        .share()
        .startWith('');
}
exports.sampleObservable = sampleObservable;
exports.getScrollListener = function (scrollTarget) {
    if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
        if (typeof window !== 'undefined') {
            console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
        }
        return Observable_1.Observable.empty();
    }
    if (scrollListeners.has(scrollTarget)) {
        return scrollListeners.get(scrollTarget);
    }
    var srollEvent = Observable_1.Observable.create(function (observer) {
        var eventName = 'scroll';
        var handler = function (event) { return observer.next(event); };
        var options = { passive: true, capture: false };
        scrollTarget.addEventListener(eventName, handler, options);
        return function () { return scrollTarget.removeEventListener(eventName, handler, options); };
    });
    var listener = sampleObservable(srollEvent);
    scrollListeners.set(scrollTarget, listener);
    return listener;
};
//# sourceMappingURL=scroll-listener.js.map
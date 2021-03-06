"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/let");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/debounceTime");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var core_1 = require("@angular/core");
var scroll_listener_1 = require("./scroll-listener");
var lazyload_image_1 = require("./lazyload-image");
var windowTarget = typeof window !== 'undefined' ? window : undefined;
var LazyLoadImageDirective = (function () {
    function LazyLoadImageDirective(el, ngZone) {
        this.onLoad = new core_1.EventEmitter();
        this.elementRef = el;
        this.ngZone = ngZone;
        this.propertyChanges$ = new ReplaySubject_1.ReplaySubject();
    }
    LazyLoadImageDirective.prototype.ngOnChanges = function (changes) {
        this.propertyChanges$.next({
            lazyImage: this.lazyImage,
            defaultImage: this.defaultImage,
            errorImage: this.errorImage,
            scrollTarget: this.scrollTarget,
            scrollObservable: this.scrollObservable,
            offset: this.offset | 0,
            useSrcset: this.useSrcset
        });
    };
    LazyLoadImageDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (typeof window === 'undefined') {
            return null;
        }
        this.ngZone.runOutsideAngular(function () {
            var scrollObservable;
            if (_this.scrollObservable) {
                scrollObservable = _this.scrollObservable.startWith('');
            }
            else {
                scrollObservable = scroll_listener_1.getScrollListener(_this.scrollTarget || windowTarget);
            }
            _this.scrollSubscription = _this.propertyChanges$
                .debounceTime(10)
                .switchMap(function (props) { return scrollObservable.let(lazyload_image_1.lazyLoadImage(_this.elementRef.nativeElement, props.lazyImage, props.defaultImage, props.errorImage, props.offset, props.useSrcset, props.scrollTarget)); })
                .subscribe(function (success) { return _this.onLoad.emit(success); });
        });
    };
    LazyLoadImageDirective.prototype.ngOnDestroy = function () {
        [this.scrollSubscription]
            .filter(function (subscription) { return subscription && !subscription.isUnsubscribed; })
            .forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    __decorate([
        core_1.Input('lazyLoad'),
        __metadata("design:type", Object)
    ], LazyLoadImageDirective.prototype, "lazyImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LazyLoadImageDirective.prototype, "defaultImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LazyLoadImageDirective.prototype, "errorImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LazyLoadImageDirective.prototype, "scrollTarget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LazyLoadImageDirective.prototype, "scrollObservable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LazyLoadImageDirective.prototype, "offset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LazyLoadImageDirective.prototype, "useSrcset", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LazyLoadImageDirective.prototype, "onLoad", void 0);
    LazyLoadImageDirective = __decorate([
        core_1.Directive({
            selector: '[lazyLoad]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
    ], LazyLoadImageDirective);
    return LazyLoadImageDirective;
}());
exports.LazyLoadImageDirective = LazyLoadImageDirective;
//# sourceMappingURL=lazyload-image.directive.js.map

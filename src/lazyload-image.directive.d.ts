import 'rxjs/add/operator/let';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { AfterContentInit, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
export declare class LazyLoadImageDirective implements OnChanges, AfterContentInit, OnDestroy {
    lazyImage: any;
    defaultImage: string;
    errorImage: string;
    scrollTarget: any;
    scrollObservable: any;
    offset: number;
    useSrcset: boolean;
    onLoad: EventEmitter<boolean>;
    private propertyChanges$;
    private elementRef;
    private ngZone;
    private platformId;
    private scrollSubscription;
    constructor(el: ElementRef, ngZone: NgZone);
    ngOnChanges(changes?: SimpleChanges): void;
    ngAfterContentInit(): any;
    ngOnDestroy(): void;
}

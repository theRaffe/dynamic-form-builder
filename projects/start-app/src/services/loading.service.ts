import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    defer,
    MonoTypeOperatorFunction,
    Observable,
} from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    excludeUrls: any;
    loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /**
     * Contains in-progress loading requests
     */
    loadingMap: Map<string, boolean> = new Map<string, boolean>();

    /**
     * An incrementing id to use for operations that come from `for`.
     * Each subscription of each operation should have it's own unique id.
     */
    private currentId: number;

    constructor(private http: HttpClient) {
        this.currentId = 2;
    }

    /**
     * @param loading {boolean}
     * @param url {string}
     */
    setLoading(loading: boolean, url: string): void {
        if (this.canShowLoader(url)) {
            this.setLoadingImp(loading, url);
        }
    }

    /**
     * Update the loading status for the given url.
     *
     * Two url string that are equal are considered the same one, so calling twice with the
     * same url and state is the same as calling only once.
     *
     * This ignores the block list of urls. {@link setLoading} is in charge of that.
     *
     * @param loading Whether to show or hide the loader: `true` to show it, `false` to hide it.
     * @param url The url to update.
     */
    private setLoadingImp(loading: boolean, url: string) {
        if (loading === true) {
            this.loadingMap.set(url, loading);
            this.loadingSub.next(true);
        } else if (loading === false && this.loadingMap.has(url)) {
            this.loadingMap.delete(url);
        }
        if (this.loadingMap.size === 0) {
            this.loadingSub.next(false);
        }
    }

    /**
     * Show a loader for the duration of an operation performed by an `Observable`.
     *
     * The observable is not started/subscribed by `for`.
     *
     * @param operation The observable to monitor. There is a loader visible from when
     *                  `operation` is subscribed until it completes.
     *
     * @returns an `Observable` that wraps the `operation` Observable but that will
     *          trigger the loader animation when subscribed to, and hides it when
     *          it completes.
     *
     */
    private for<T>(operation: Observable<T>): Observable<T> {
        // XXX: using defer so that if the `Observable` returned from `for` is subscribed
        //      twice each subscription has their own id.
        const wrapper = defer(() => {
            const id = this.generateUniqueId();
            console.log({generateUniqueId: id});
            this.setLoadingImp(true, id);
            return operation.pipe(
                finalize(() => {
                    this.setLoadingImp(false, id);
                })
            );
        });

        return wrapper;
    }

    /**
     * Show a loader for the duration of an operation performed by an `Observable`.
     *
     * @see for
     */
    withLoader<T>(): MonoTypeOperatorFunction<T> {
        return (op: Observable<T>) => this.for(op);
    }

    private canShowLoader(url: string): boolean {
        if (this.excludeUrls) {
            return this.excludeUrls.blackList.find((x: string) =>
                url.includes(x)
            )
                ? false
                : true;
        } else {
            return false;
        }
    }

    /**
     * method to loads black list of urls that shouldn't show loading animation 
     */
    loadList() {
        this.http
            .get(`/assets/locale/loaderUrl_blackList.json`)
            .subscribe((value) => {
                this.excludeUrls = value;
            });
    }

    /**
     * Generate a unique id string.
     */
    private generateUniqueId(): string {
        // XXX: using l33t speak instead of 'OPERATION' to try to
        //      avoid being filtered by the block list from `loadList()`
        return `oP3r4t10n[${this.currentId++}]`;
    }
}

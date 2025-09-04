import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SafeStorageService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    getItem(key: string): string | null {
        return isPlatformBrowser(this.platformId)
            ? sessionStorage.getItem(key)
            : null;
    }

    setItem(key: string, value: string): void {
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem(key, value);
        }
    }

    removeItem(key: string): void {
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.removeItem(key);
        }
    }
}

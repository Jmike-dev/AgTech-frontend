import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'dash-button',
    imports: [MatIconModule],
    template: ` <button
        type="submit"
        [disabled]="loading()"
        class="group border-brand-primary-light text-brand-background-light hover:border-brand-accent-light relative m-1 cursor-pointer overflow-hidden rounded-md border-2 px-3.5 py-2 font-medium capitalize"
        (click)="onClickButton($event)"
    >
        <span
            class="ease bg-brand-accent-light absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45 transition-all duration-300 group-hover:h-64 group-hover:-translate-y-32"
        ></span>
        <span
            class="ease text-brand-text-light/85 group-hover:text-brand-background-light relative flex items-center gap-1 transition duration-300"
        >
            <mat-icon class="text-base">{{ icon() }}</mat-icon>
            {{ buttonText() }}
        </span>
    </button>`,
})
export class DashButtonComponent {
    readonly buttonClick = output<any>();
    readonly buttonText = input.required<string>();
    readonly loadingText = input('');
    readonly loading = input(false);
    readonly icon = input('');

    onClickButton(event: any) {
        if (!this.loading()) {
            this.buttonClick.emit(event);
        }
    }
}

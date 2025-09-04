import { Component, input, output } from '@angular/core';

@Component({
    selector: 'med-button',
    template: `
        <button
            (click)="onClickButton()"
            type="submit"
            [disabled]="loading() || disabled()"
            class="group relative inline-block w-full overflow-hidden rounded px-5 py-2.5 font-medium transition-opacity duration-200 hover:text-brand-background-light
       {{
                loading() || disabled()
                    ? 'bg-brand-accent-light text-gray-100 cursor-not-allowed'
                    : 'bg-brand-primary-light/50 text-brand-text-light cursor-pointer'
            }}"
        >
            @if (!loading()) {
                <span
                    class="bg-brand-accent-light absolute top-0 left-0 mb-0 flex h-0 w-full translate-y-0 transform opacity-90 transition-all duration-200 ease-out group-hover:h-full"
                ></span>
            }

            <span class="relative flex items-center justify-center space-x-2">
                @if (loading()) {
                    <svg
                        class="text-brand-text-light h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                }
                <span class="capitalize">{{
                    loading() ? loadingText() : buttonText()
                }}</span>
            </span>
        </button>
    `,
})
export class MedButtonComponent {
    readonly buttonText = input.required<string>();
    readonly loadingText = input('');
    readonly loading = input(false);
    readonly disabled = input(false);

    // ✅ NEW input for payload
    readonly payload = input<any>();

    readonly buttonClick = output<any>();

    // ✅ Emit payload, not the click event
    onClickButton() {
        if (!this.loading()) {
            this.buttonClick.emit(this.payload());
        }
    }
}

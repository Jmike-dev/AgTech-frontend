import { CommonModule } from '@angular/common';
import {
    Component,
    OnChanges,
    SimpleChanges,
    input,
    output,
} from '@angular/core';
import { MedButtonComponent } from '@components/med-button/med-button.component';

export interface TableColumn<table = any> {
    key: string;
    label: string;
    render: (row: table) => string;
}

@Component({
    selector: 'staff-table',
    imports: [CommonModule, MedButtonComponent],
    template: `
        <div class="overflow-hidden shadow-sm">
            <!-- Table Container -->
            <div
                class="border-brand-text-light/10 max-h-[1000px] cursor-default overflow-x-auto overflow-y-auto rounded-lg border"
            >
                <table
                    class="w-full table-fixed border-separate border-spacing-y-4 bg-teal-300/5 p-4"
                >
                    <thead
                        class="sticky top-0 z-10 border-b border-gray-200 bg-teal-100"
                    >
                        <tr>
                            @for (tableTitle of tableTitles(); track $index) {
                                <th
                                    class="border-brand-text-light/20 border-b-2 px-6 py-3 text-left text-lg font-semibold tracking-wider uppercase backdrop-blur-3xl"
                                    [class.rounded-tl-2xl]="$index === 0"
                                >
                                    {{ tableTitle.label }}
                                </th>
                            }
                            <th
                                class="border-brand-text-light/20 rounded-tr-2xl border-b-2 px-6 py-3 text-left text-lg font-semibold tracking-wider uppercase backdrop-blur-3xl"
                            >
                                view profile
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        class="bg-brand-background-light divide-y divide-gray-200"
                    >
                        @if (loading()) {
                            @for (_ of skeletonRows; track $index) {
                                <tr>
                                    @for (_ of tableTitles(); track $index) {
                                        <td class="px-6 py-4">
                                            <div
                                                class="h-4 w-3/4 animate-pulse rounded bg-gray-200"
                                            ></div>
                                        </td>
                                    }
                                    <td class="px-6 py-4">
                                        <div
                                            class="h-8 w-20 animate-pulse rounded bg-gray-200"
                                        ></div>
                                    </td>
                                </tr>
                            }
                        } @else {
                            @for (
                                data of sortedTableData;
                                track data.staff_id
                            ) {
                                <tr
                                    class="hover:bg-brand-primary-light/10 cursor-pointer rounded-2xl bg-white shadow-sm transition-colors duration-150"
                                    (click)="onClickButton(data)"
                                >
                                    @for (
                                        title of tableTitles();
                                        track $index
                                    ) {
                                        <td
                                            class="px-6 py-4 whitespace-nowrap"
                                            [class.rounded-l-2xl]="$index === 0"
                                            [class.rounded-r-2xl]="$index === 4"
                                        >
                                            @if (title.label === 'Role') {
                                                <span
                                                    [ngClass]="{
                                                        'border-amber-200 bg-amber-100 text-amber-800':
                                                            data[title.key] ===
                                                            'teacher',
                                                        'border-indigo-200 bg-indigo-100 text-indigo-800':
                                                            data[title.key] ===
                                                            'driver',
                                                        'border-emerald-200 bg-emerald-100 text-emerald-800':
                                                            data[title.key] ===
                                                            'catering',
                                                        'border-pink-200 bg-pink-100 text-pink-800':
                                                            data[title.key] ===
                                                            'housekeeping',
                                                        'border-lime-200 bg-lime-100 text-lime-800':
                                                            data[title.key] ===
                                                            'maintenance',
                                                        'border-teal-200 bg-teal-100 text-teal-800':
                                                            data[title.key] ===
                                                            'security',
                                                        'border-orange-200 bg-orange-100 text-orange-800':
                                                            data[title.key] ===
                                                            'admin',
                                                    }"
                                                    class="inline-flex cursor-default items-center rounded-full border px-2.5 py-1 text-lg font-medium capitalize"
                                                >
                                                    {{ title.render(data) }}
                                                </span>
                                            } @else if (
                                                title.label
                                                    .toLowerCase()
                                                    .includes('date') ||
                                                title.label
                                                    .toLowerCase()
                                                    .includes('duration')
                                            ) {
                                                <span
                                                    class="text-sm text-gray-600"
                                                >
                                                    {{ title.render(data) }}
                                                </span>
                                            } @else if (
                                                title.key === 'name' ||
                                                title.label
                                                    .toLowerCase()
                                                    .includes('name')
                                            ) {
                                                <div class="flex items-center">
                                                    <div
                                                        class="h-8 w-8 flex-shrink-0"
                                                    >
                                                        <div
                                                            class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-medium text-white"
                                                        >
                                                            {{
                                                                getInitials(
                                                                    title.render(
                                                                        data
                                                                    )
                                                                )
                                                            }}
                                                        </div>
                                                    </div>
                                                    <div class="ml-3">
                                                        <span
                                                            class="text-brand-text-light text-lg font-medium capitalize"
                                                        >
                                                            {{
                                                                title.render(
                                                                    data
                                                                )
                                                            }}
                                                        </span>
                                                    </div>
                                                </div>
                                            } @else {
                                                <span
                                                    class="text-lg text-gray-900 capitalize"
                                                >
                                                    {{ title.render(data) }}
                                                </span>
                                            }
                                        </td>
                                    }
                                    <td
                                        class="rounded-r-2xl px-6 py-4 whitespace-nowrap"
                                    >
                                        <div class="w-3/4 p-4">
                                            <med-button
                                                buttonText="profile"
                                                (buttonClick)="
                                                    onClickButton(data)
                                                "
                                                [payload]="data"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            }
                        }
                    </tbody>
                </table>
            </div>

            @if (sortedTableData.length === 0 && loading() === false) {
                <div class="px-6 py-12 text-center">
                    <div class="text-sm text-gray-400">
                        No patients members found 🥲
                    </div>
                </div>
            }
        </div>
    `,
})
export class StaffTableComponent implements OnChanges {
    readonly tableTitles = input.required<TableColumn[]>();
    readonly tableData = input.required<any[]>();
    readonly viewProfile = output<any>();
    readonly loading = input(false);

    sortedTableData: any[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tableData']) {
            this.sortTableData();
        }
    }

    onClickButton(event: any) {
        this.viewProfile.emit(event);
    }

    getInitials(name: string): string {
        if (!name) return '';
        return name
            .split(' ')
            .map((word) => word.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    private sortTableData(): void {
        this.sortedTableData = [...this.tableData()].sort((a, b) => {
            const dateA = this.getDateValue(a);
            const dateB = this.getDateValue(b);

            if (dateA && dateB) {
                return new Date(dateB).getTime() - new Date(dateA).getTime();
            }
            return 0;
        });
    }

    private getDateValue(record: any): any {
        const dateFields = ['createdAt'];

        for (const field of dateFields) {
            if (record[field]) {
                return record[field];
            }
        }

        return null;
    }

    get skeletonRows(): any[] {
        return Array(20);
    }
}

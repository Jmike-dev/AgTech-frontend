import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Inject,
    PLATFORM_ID,
    inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { FarmersStore } from '@store/farmer.store';
import { toast } from 'ngx-sonner';
import {
    StaffTableComponent,
    TableColumn,
} from '@components/staff-table/staff-table.component';

Chart.register(...registerables);

@Component({
    selector: 'app-farmers',
    templateUrl: './farmers.component.html',
    imports: [StaffTableComponent],
})
export class FarmersComponent implements OnInit {
    @ViewChild('genderCanvas', { static: true }) genderCanvas!: ElementRef;
    @ViewChild('cropsCanvas', { static: true }) cropsCanvas!: ElementRef;
    farmersStore = inject(FarmersStore);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.renderGenderChart();
            this.renderCropsChart();
        }
        this.farmersPageInit();
    }

    private renderGenderChart() {
        new Chart(this.genderCanvas.nativeElement, {
            type: 'pie',
            data: {
                labels: ['Male', 'Female'],
                datasets: [
                    {
                        label: 'Gender Distribution',
                        data: [60, 40],
                        backgroundColor: ['#3B82F6', '#F472B6'],
                    },
                ],
            },
        });
    }

    private renderCropsChart() {
        new Chart(this.cropsCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ['Maize', 'Beans', 'Spinach', 'Peas'],
                datasets: [
                    {
                        label: 'Number of Crops',
                        data: [120, 90, 50, 70],
                        backgroundColor: '#22C55E',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
    async farmersPageInit() {
        const adminId = sessionStorage.getItem('adminId');
        if (!adminId) {
            toast.error('No admin ID found in session. Please log in again.');
            return;
        }
        try {
            await this.farmersStore.fetchAllFarmers(adminId);

            const farmersError = this.farmersStore.error();

            if (farmersError) {
                toast.error(`Staff Error: ${farmersError}`);
            }
        } catch (err: any) {
            toast.error(
                `Unexpected Error: ${err.message || 'Something went wrong.'}`,
            );
        }
    }
    staffTableTitles: TableColumn[] = [
        // {
        //     key: 'role',
        //     label: 'Role',
        //     render: (row: any) => row.role,
        // },
        {
            key: 'fullName',
            label: 'Name',
            render: (row: any) => `${row.firstName} ${row.lastName}`,
        },
        {
            key: 'email',
            label: 'email',
            render: (row: any) => row.email,
        },
    ];
    searchQuery: string = '';

    filteredFarmers() {
        if (!this.searchQuery.trim()) {
            return this.farmersStore.farmers();
        }

        return this.farmersStore
            .farmers()
            .filter(
                (staff) =>
                    staff.firstName
                        ?.toLowerCase()
                        .includes(this.searchQuery.toLowerCase()) ||
                    staff.lastName
                        ?.toLowerCase()
                        .includes(this.searchQuery.toLowerCase()) ||
                    staff.email
                        ?.toLowerCase()
                        .includes(this.searchQuery.toLowerCase()),
            );
    }
}

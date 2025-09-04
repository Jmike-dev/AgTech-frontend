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
import { CropsStore } from '@store/crops.store';
import { toast } from 'ngx-sonner';
import {
    StaffTableComponent,
    TableColumn,
} from '@components/staff-table/staff-table.component';

Chart.register(...registerables);

@Component({
    selector: 'app-crops',
    templateUrl: './crops.component.html',
    imports: [StaffTableComponent],
})
export class CropsComponent implements OnInit {
    @ViewChild('usageCanvas', { static: true }) usageCanvas!: ElementRef;
    @ViewChild('cropsCanvas', { static: true }) cropsCanvas!: ElementRef;
    cropsStore = inject(CropsStore);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.renderUsageChart();
            this.renderCropsChart();
        }
        this.cropsPageInit();
    }

    private renderUsageChart() {
        new Chart(this.usageCanvas.nativeElement, {
            type: 'pie',
            data: {
                labels: ['Used', 'In Storage'],
                datasets: [
                    {
                        label: 'Crop Usage',
                        data: [70, 30], // dummy data
                        backgroundColor: ['#F59E0B', '#10B981'], // amber & green
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
                        data: [100, 80, 60, 40], // dummy data
                        backgroundColor: '#3B82F6', // blue
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
    async cropsPageInit() {
        const adminId = sessionStorage.getItem('adminId');
        if (!adminId) {
            toast.error('No admin ID found in session. Please log in again.');
            return;
        }
        try {
            await this.cropsStore.fetchAllCropsAdmin(adminId);

            const cropsError = this.cropsStore.error();

            if (cropsError) {
                toast.error(`Crops Error: ${cropsError}`);
            }
        } catch (err: any) {
            toast.error(
                `Unexpected Error: ${err.message || 'Something went wrong.'}`,
            );
        }
    }
    cropsTableTitles: TableColumn[] = [
        {
            key: 'name',
            label: 'Name',
            render: (row: any) => row.name,
        },
        {
            key: 'number',
            label: 'number of Items in stock',
            render: (row: any) => row.number,
        },
    ];
}

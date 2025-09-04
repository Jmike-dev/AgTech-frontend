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
import {
    StaffTableComponent,
    TableColumn,
} from '@components/staff-table/staff-table.component';
import { toast } from 'ngx-sonner';

Chart.register(...registerables);

@Component({
    selector: 'app-farmer-crops',
    templateUrl: './farmer-crops.component.html',
    imports: [StaffTableComponent],
})
export class FarmerCropsComponent implements OnInit {
    @ViewChild('usageCanvas', { static: true }) usageCanvas!: ElementRef;
    @ViewChild('cropsCanvas', { static: true }) cropsCanvas!: ElementRef;
    cropsStore = inject(CropsStore);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.renderUsageChart();
            this.renderCropsChart();
        }
    }

    private renderUsageChart() {
        new Chart(this.usageCanvas.nativeElement, {
            type: 'pie',
            data: {
                labels: ['Used', 'In Storage'],
                datasets: [
                    {
                        label: 'Farmers Crops Usage',
                        data: [55, 45], // dummy data
                        backgroundColor: ['#E11D48', '#3B82F6'], // red & blue
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
                        label: 'Crops per Farmer',
                        data: [80, 65, 40, 50], // dummy data
                        backgroundColor: '#10B981', // green
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
        const farmerId = sessionStorage.getItem('farmerId');
        if (!farmerId) {
            toast.error('No admin ID found in session. Please log in again.');
            return;
        }
        try {
            await this.cropsStore.fetchCrops(farmerId);

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

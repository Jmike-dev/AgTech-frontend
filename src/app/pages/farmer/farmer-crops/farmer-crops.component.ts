import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-farmer-crops',
    templateUrl: './farmer-crops.component.html',
})
export class FarmerCropsComponent implements OnInit {
    @ViewChild('usageCanvas', { static: true }) usageCanvas!: ElementRef;
    @ViewChild('cropsCanvas', { static: true }) cropsCanvas!: ElementRef;

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
}

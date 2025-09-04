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
    selector: 'app-farmers',
    templateUrl: './farmers.component.html',
})
export class FarmersComponent implements OnInit {
    @ViewChild('genderCanvas', { static: true }) genderCanvas!: ElementRef;
    @ViewChild('cropsCanvas', { static: true }) cropsCanvas!: ElementRef;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.renderGenderChart();
            this.renderCropsChart();
        }
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
}

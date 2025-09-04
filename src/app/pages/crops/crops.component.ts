import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-crops',
    standalone: true,
    templateUrl: './crops.component.html',
})
export class CropsComponent implements OnInit {
    @ViewChild('usageCanvas', { static: true }) usageCanvas!: ElementRef;
    @ViewChild('cropsCanvas', { static: true }) cropsCanvas!: ElementRef;

    ngOnInit(): void {
        this.renderUsageChart();
        this.renderCropsChart();
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
}

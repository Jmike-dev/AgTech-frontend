import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-farmers',
    templateUrl: './farmers.component.html',
})
export class FarmersComponent implements OnInit {
    @ViewChild('genderCanvas', { static: true }) genderCanvas!: ElementRef;
    @ViewChild('cropsCanvas', { static: true }) cropsCanvas!: ElementRef;

    ngOnInit(): void {
        this.renderGenderChart();
        this.renderCropsChart();
    }

    private renderGenderChart() {
        new Chart(this.genderCanvas.nativeElement, {
            type: 'pie',
            data: {
                labels: ['Male', 'Female'],
                datasets: [
                    {
                        label: 'Gender Distribution',
                        data: [60, 40], // dummy data
                        backgroundColor: ['#3B82F6', '#F472B6'], // blue & pink
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
                        data: [120, 90, 50, 70], // dummy data
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

import { Component, OnInit, Input } from '@angular/core';
import { TYPE_OF_SKINS } from 'src/app/models/labels';
import { HAM10000Service } from 'src/app/services/ham10000.service';
import {
  switchMap,
  map,
  filter,
  startWith,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { SkinCard } from 'src/app/skin-information/skin-information.component';
import { Chart } from 'chart.js';
import { FormControl } from '@angular/forms';
import { of, combineLatest } from 'rxjs';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss'],
})
export class ResultViewComponent implements OnInit {
  public chartViews = [
    { viewValue: 'Prawdopodobienstwo', value: SelectedChart.prediction },
    { viewValue: 'Wiek', value: SelectedChart.age },
    { viewValue: 'Wystepowanie', value: SelectedChart.localization },
    { viewValue: 'Płeć', value: SelectedChart.sex },
  ];
  public selectedChart: FormControl = new FormControl(SelectedChart.prediction);
  public labels = TYPE_OF_SKINS;
  public card: SkinCard = null;
  public prediction: number[];
  probability: number[];
  constructor(private service: HAM10000Service) {}
  public updateChart(y: number[]) {
    this.chart.config.type = this.resolveTypeOfChart();

    this.chart.data.datasets[0].data = y;
    this.chart.data.labels = this.labels;

    this.chart.update();
  }
  public updateChart2(data: any[]) {
    this.chart.config.type = this.resolveTypeOfChart();
    this.chart.data.datasets[0].data = Object.values(data);
    this.chart.data.labels = Object.keys(data);
    this.chart.update();
  }
  public ngOnInit(): void {
    this.selectedChart.valueChanges
      .pipe(
        filter((value) => SelectedChart.prediction !== value),
        switchMap((value) => this.service.getChart(value, this.card.label))
      )
      .subscribe((value) => this.updateChart2(value));
    this.selectedChart.valueChanges
      .pipe(filter((value) => SelectedChart.prediction === value))
      .subscribe((value) => this.updateChart(this.probability));
    this.service.predictSubject.subscribe((pred) => this.updateChart(pred));

    this.service.predictSubject.subscribe(
      (probability) => (this.probability = probability)
    );

    this.service.predictSubject
      .pipe(
        switchMap((value) =>
          this.service
            .getSkinsCard()
            .pipe(
              map((card) =>
                card.find(
                  (c) =>
                    c.label === this.labels[value.indexOf(Math.max(...value))]
                )
              )
            )
        )
      )
      .subscribe((card) => (this.card = card));
  }
  public imageHelper(card: SkinCard): string {
    if (card) return `./assets/skin-images/${card.label}.jpg`;
    return `./assets/placeholder.jpg`;
  }

  public data: any;
  public chart: any;

  ngAfterViewInit(): void {
    const myColors = ['red', 'green', 'blue'];
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 255, 1)',
              'rgba(54, 162, 133, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 22, 44, 1)',
              'rgba(153, 102, 33, 1)',
              'rgba(255, 23, 64, 1)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 255, 1)',
              'rgba(54, 162, 133, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 22, 44, 1)',
              'rgba(153, 102, 33, 1)',
              'rgba(255, 23, 64, 1)',
            ],
          },
        ],
      },
      options: {
        onClick: (evt) => {
          const activePoints = this.chart.getElementsAtEventForMode(
            evt,
            'point',
            this.chart.options
          );
          const firstPoint = activePoints[0];
          const label = this.chart.data.labels[firstPoint._index];
          // this.service.predictSubject.next(TYPE_OF_SKINS.indexOf(label));
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],
          yAxes: [
            {
              display: true,
            },
          ],
        },
      },
    });
  }

  public resolveTypeOfChart(): string {
    const v = this.selectedChart.value;
    if (v === SelectedChart.age) return 'line';
    return 'bar';
  }
}

enum SelectedChart {
  prediction = 'prediction',
  age = 'age',
  sex = 'sex',
  localization = 'localization',
}

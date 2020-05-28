import { Component, OnInit, Input } from '@angular/core';
import { TYPE_OF_SKINS } from 'src/app/models/labels';
import { HAM10000Service } from 'src/app/services/ham10000.service';
import { switchMap, map } from 'rxjs/operators';
import { SkinCard } from 'src/app/skin-information/skin-information.component';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss'],
})
export class ResultViewComponent implements OnInit {
  public chartViews = [
    { viewValue: 'Prawdopodobienstwo', value: 0 },
    { viewValue: 'Wiek', value: 0 },
    { viewValue: 'Wystepowanie', value: 0 },
  ];
  public selectedChart: number = 0;
  public highestLabel;
  public labels = TYPE_OF_SKINS;
  public card: SkinCard = null;
  public prediction: number[];
  constructor(private service: HAM10000Service) {}
  public updateChart(y: number[]) {
    this.chart.data.datasets[0].data = y;
    this.chart.update();
  }
  public ngOnInit(): void {
    this.service.predictSubject.subscribe((pred) => this.updateChart(pred));

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
    if (card) return `/assets/skin-images/${card.label}.jpg`;
    return `/assets/placeholder.jpg`;
  }

  public data: any;
  public chart: any;

  ngAfterViewInit(): void {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{}],
      },
      options: {
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
}

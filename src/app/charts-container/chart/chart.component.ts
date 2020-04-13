import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { Chart } from 'chart.js';
import { TYPE_OF_SKINS } from 'src/app/models/labels';
import { HAM10000Service } from 'src/app/services/ham10000.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  public data: any;
  public chart: any;

  constructor(private service: HAM10000Service) {}
  ngAfterViewInit(): void {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Label1', 'Label2', 'Label3', 'Label4'],
        borderColor: '#fffff',
        datasets: [
          {},
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: true,
                color: '#FFFFFF',
              },
              scaleLabel: {
                display: true,
                labelString: 'X axe name',
                fontColor: '#FFFFFF',
                fontSize: 12,
              },
              ticks: {
                fontColor: '#FFFFFF',
                fontSize: 12,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                display: true,
                color: '#FFFFFF',
              },
              scaleLabel: {
                display: true,
                labelString: 'X axe name',
                fontColor: '#FFFFFF',
                fontSize: 12,
              },
              ticks: {
                fontColor: '#FFFFFF',
                fontSize: 12,
              },
            },
          ],
        },
      },
    });
  }

  ngOnInit(): void {
    // this.service
    //   .getDate()
    //   .pipe(
    //     map((data) =>
    //       data.reduce((prev, curr) => {
    //         return [...prev, data.filter((d) => d.dx === curr.dx).length];
    //       }, [])
    //     )
    //   )
    //   .subscribe((d) => {
    //     Object.keys(d).forEach((key) => {
    //       this.addData(this.chart, key, d[key]);
    //     });
    //   });
  }
  public addData(chart, label, data) {
    chart.data.datasets.data = data;
    chart.update();
  }
}

import { Component, OnInit } from '@angular/core';
import { HAM10000Service } from '../services/ham10000.service';
import { map, tap } from 'rxjs/operators';
import { TYPE_OF_SKINS } from '../models/labels';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  data: any;
  constructor(private service: HAM10000Service) {}

  ngOnInit(): void {
    this.service
      .getDate()
      .pipe(
        map((data) =>
          data.reduce((prev, curr) => {
            return {
              ...prev,
              [curr.dx]: [data.filter((d) => d.dx === curr.dx).length],
            };
          }, {})
        )
      )
      .subscribe((d) => {
        this.data = d;
      });
  }
}

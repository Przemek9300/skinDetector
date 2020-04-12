import { Component, OnInit } from '@angular/core';
import { HAM10000Service } from '../services/ham10000.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  constructor(private service: HAM10000Service) {}

  ngOnInit(): void {
    this.service.getDate().subscribe((value) => console.log(value));
  }
}

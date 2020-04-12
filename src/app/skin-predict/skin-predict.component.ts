import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skin-predict',
  templateUrl: './skin-predict.component.html',
  styleUrls: ['./skin-predict.component.scss'],
})
export class SkinPredictComponent implements OnInit {
  public models: ['cancer-skin-2020-02-01', 'cancer-skin-2019-02-01'];
  public selectedValue: string;
  constructor() {}

  ngOnInit(): void {}
}

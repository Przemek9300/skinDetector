import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
@Component({
  selector: 'app-skin-predict',
  templateUrl: './skin-predict.component.html',
  styleUrls: ['./skin-predict.component.scss'],
})
export class SkinPredictComponent implements OnInit {
  public models: ['cancer-skin-2020-02-01', 'cancer-skin-2019-02-01'];
  public modelTF: any;
  public selectedValue: string;
  constructor() {}

  public async ngOnInit(): Promise<void> {
    await this.loadModel();
  }
  public async loadModel() {
    this.modelTF = await tf.loadLayersModel('/assets/model-tf/model.json');
  }
}

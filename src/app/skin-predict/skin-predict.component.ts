import { Component, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { Router } from '@angular/router';
import { SkinPredictService } from '../skin-predict.service';
@Component({
  selector: 'app-skin-predict',
  templateUrl: './skin-predict.component.html',
  styleUrls: ['./skin-predict.component.scss'],
})
export class SkinPredictComponent implements OnInit {
  @ViewChild('userImage') public userImage;
  public models: ['cancer-skin-2020-02-01', 'cancer-skin-2019-02-01'];
  public modelTF: any;
  public selectedValue: string;
  public image: any = null;
  public predictions: number[] = null;

  constructor(private router: Router, private service: SkinPredictService) {}

  public async ngOnInit(): Promise<void> {
    await this.loadModel();
  }
  public async loadModel() {
    this.modelTF = await tf.loadLayersModel('/assets/model-tf/model.json');
  }
  public onFileChanged(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res: any) => {
        this.image = res.target;
      };
    }
  }
  public async predict() {
    let img = tf.browser.fromPixels(this.userImage.nativeElement);
    img = tf.image
      .resizeBilinear(img, [224, 224], true)
      .toFloat()
      .expandDims(0);
    this.modelTF
      .predict(img)
      .data()
      .then((value) => this.service.skinPrediction.next(value));

    this.router.navigate(['result']);
  }
}

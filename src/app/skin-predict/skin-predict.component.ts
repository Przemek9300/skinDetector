import { Component, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { HAM10000Service } from '../services/ham10000.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { async } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-skin-predict',
  templateUrl: './skin-predict.component.html',
  styleUrls: ['./skin-predict.component.scss'],
})
export class SkinPredictComponent implements OnInit {
  @ViewChild('userImage') public userImage = null;
  public cancerModels: { value: string; viewValue: string }[] = [];
  public modelTF: any;
  public selectedValue: string;
  public image: any;
  public predictions: number = null;
  public loading = false;
  public formControl = new FormControl('');

  constructor(
    private service: HAM10000Service,
    private afStorage: AngularFireStorage,
    private http: HttpClient
  ) {}

  public async ngOnInit(): Promise<void> {
    this.afStorage.storage
      .ref()
      .listAll()
      .then(
        (el) =>
          (this.cancerModels = el.items.map((item) => ({
            value: item.name,
            viewValue: item.name,
          })))
      );
    this.formControl.valueChanges.subscribe(async (value) => {
      await this.loadModel(value);
    });
  }
  public async loadModel(selectedValue: string) {
    console.log(selectedValue);

    // this.afStorage.storage
    //   .ref()
    //   .child(selectedValue)
    //   .getDownloadURL()
    //   .then(async (url) => {
    //     console.log(url);

    //     console.log(this.modelTF);
    //   });
    this.modelTF = await tf.loadLayersModel(`/assets/model-ml/model.json`);
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
  predict(): Observable<void> {
    this.loading = true;
    let img = tf.browser.fromPixels(this.userImage.nativeElement);
    img = tf.image
      .resizeBilinear(img, [224, 224], true)
      .toFloat()
      .expandDims(0);
    return this.modelTF
      .predict(img)
      .data()
      .then((prediction) => {
        this.loading = false;
        this.service.predictSubject.next(prediction);
      });
  }
}

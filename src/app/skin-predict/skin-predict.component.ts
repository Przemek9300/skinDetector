import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as tf from '@tensorflow/tfjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

import { HAM10000Service } from '../services/ham10000.service';
import { setLabel, setPredictionResult } from '../store/actions';
import { PredictionState } from '../store/reducer';

@Component({
  selector: 'app-skin-predict',
  templateUrl: './skin-predict.component.html',
  styleUrls: ['./skin-predict.component.scss'],
})
export class SkinPredictComponent implements OnInit {
  @ViewChild('userImage') public userImage = null;
  public cancerModels: { value: string; viewValue: string }[] = [
    { value: 'model.json', viewValue: '2019-09-10 - model' },
    { value: 'model2.json', viewValue: '2019-12-10 - model' },
    // { value: 'model3.json', viewValue: '2020-02-10 - model' },
    { value: 'model4/model4.json', viewValue: '2020-03-12 - model' },
  ];
  public modelTF: any = null;
  public selectedValue: string;
  public image: any = null;
  public predictions: number = null;
  public loading = false;
  public formControl = new FormControl('', Validators.required);

  public isCameraMode:any
  public webcamImage: WebcamImage;
  public capture$ = new Subject<null>()
  constructor(
    private service: HAM10000Service,
    private spinner: NgxSpinnerService,
    private store: Store<PredictionState>
  ) {}

  public async ngOnInit(): Promise<void> {
    this.formControl.valueChanges.subscribe(async (value) => {
      this.spinner.show();
      await this.loadModel(value);
    });
  }
  public async loadModel(selectedValue: string) {
    this.modelTF = await tf.loadLayersModel(
      `./assets/model-tf/${selectedValue}`
    );
    this.spinner.hide();
  }
  public capture(){
    if(this.webcamImage ===null){

      this.capture$.next()
    }
    else{
      this.webcamImage = null
    }   
  }
  public setCameraMode(s:boolean){
    this.isCameraMode = s;
    this.image = null;
    this.webcamImage = null
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.log(webcamImage);
    this.webcamImage = webcamImage
    this.image = webcamImage;
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
    this.spinner.show();
    let img = tf.browser.fromPixels(this.userImage.nativeElement);
    img = tf.image
      .resizeBilinear(img, [224, 224], true)
      .toFloat()
      .expandDims(0);
    return this.modelTF
      .predict(img)
      .data()
      .then((prediction) => {
        this.spinner.hide();
        this.store.dispatch(setPredictionResult({ result: [...prediction] }));
        this.store.dispatch(
          setLabel({ index: prediction.indexOf(Math.max(...prediction)) })
        );

        // this.service.predictSubject.next(prediction);
      });
  }
}

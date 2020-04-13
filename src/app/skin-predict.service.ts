import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkinPredictService {
  public skinPrediction = new Subject<number[]>();
  constructor() {}
}

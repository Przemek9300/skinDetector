import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HAM10000Service {
  constructor(private http: HttpClient) {}
  public getDate(): Observable<SkinDate[]> {
    return this.http.get<SkinDate[]>('./assets/ham10000.json');
  }
}

export interface SkinDate {
  lesion_id: string;
  image_id: string;
  dx: string;
  dx_type: string;
  age: number;
  sex: string;
  localization: string;
}

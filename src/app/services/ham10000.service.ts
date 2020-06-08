import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HAM10000Service {
  public predictSubject = new Subject<number[]>();
  constructor(private http: HttpClient) {}
  public getSkinDate(): Observable<SkinDate[]> {
    return this.http.get<SkinDate[]>('/assets/ham10000.json');
  }
  public getSkinsCard(): Observable<any[]> {
    return this.http.get<any[]>('/assets/skin-information.json');
  }
  public getChart(category: string, label: string): Observable<any[]> {
    return this.http.get<any[]>(`/assets/chart/${label}-${category}.json`);
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

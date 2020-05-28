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
    return this.http.get<SkinDate[]>('./assets/ham10000.json');
  }
  public getSkinsCard() {
    return of([
      {
        label: 'akiec',
        title: 'Actinic Keratoses(akiec)',
        description:
          'Actinic keratoses describes lesions on the outer skin layer caused by too much exposure to the ultraviolet rays of sunlight. They are also the beginnings of skin cancer, most often appearing after age 40. (WebMD)',
      },

      {
        label: 'bcc',
        title: 'Basal Cell Carcinoma(bcc)',

        description:
          'Basal cell carcinoma is a cancer that grows on parts of your skin that get a lot of sun. It s the least risky type of skin cancer and is unlikely to spread to other parts of your body. (WebMD) ',
      },
      {
        label: 'bkl',
        title: 'Seborrheic Keratosis(bkl)',

        description:
          'Seborrheic keratoses are noncancerous skin growths that some people develop as they age. They often appear on the back or chest, but can occur on any part of the body. (WebMD)',
      },
      {
        label: 'df',
        title: 'Dermatofibroma(df)',

        description:
          'Dermatofibromas are harmless round, red-brownish skin growths that are most commonly found on the arms and legs. Dermatofibromas contains scar tissue and feel like hard lumps in the skin. (WebMD)',
      },
      {
        label: 'mel',
        title: 'Malignant Melanoma(mel)',

        description:
          'Melanoma, the most serious type of skin cancer, develops in the cells (melanocytes) that produce melanin — the pigment that gives your skin its color. Melanoma can also form in your eyes and, rarely, in internal organs, such as your intestines. (MayoClinic)',
      },
      {
        label: 'nv',
        title: 'Melanocytic Nevi(nv)',

        description:
          'Melanocytic nevi are benign neoplasms or hamartomas composed of melanocytes, the pigment-producing cells that constitutively colonize the epidermis. (eMedicine)',
      },
      {
        label: 'vasc',
        title: 'Vascular Lesions(vasc)',

        description:
          'The most common vascular lesions in childhood are the hemangiomas of infancy and, in adulthood, the cherry angiomas. Hemangiomas and angiomas are benign proliferations of blood vessels. (Dermoscopedia)',
      },
    ]);
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

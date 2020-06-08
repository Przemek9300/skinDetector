import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkinPredictComponent } from './skin-predict/skin-predict.component';
import { ChartsComponent } from './charts-container/charts.component';
import { SkinInformationComponent } from './skin-information/skin-information.component';
import { ModelUploadComponent } from './model-upload/model-upload.component';

const routes: Routes = [
  { path: '', component: SkinPredictComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'info', component: SkinInformationComponent },
  // { path: 'chart', component: ChartsComponent },
  // { path: 'upload', component: ModelUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

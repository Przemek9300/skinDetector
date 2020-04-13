import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkinPredictComponent } from './skin-predict/skin-predict.component';
import { ChartsComponent } from './charts-container/charts.component';
import { SkinInformationComponent } from './skin-information/skin-information.component';
import { ResultViewComponent } from './skin-predict/result-view/result-view.component';

const routes: Routes = [
  { path: '', component: SkinPredictComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'info', component: SkinInformationComponent },
  { path: 'chart', component: ChartsComponent },
  { path: 'result', component: ResultViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

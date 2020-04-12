import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkinPredictComponent } from './skin-predict/skin-predict.component';
import { ChartsComponent } from './charts/charts.component';
import { SkinInformationComponent } from './skin-information/skin-information.component';

const routes: Routes = [
  { path: '', component: SkinPredictComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'info', component: SkinInformationComponent },
  { path: 'chart', component: ChartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

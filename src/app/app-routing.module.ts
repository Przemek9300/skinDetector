import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkinPredictComponent } from './skin-predict/skin-predict.component';

const routes: Routes = [{ path: '', component: SkinPredictComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

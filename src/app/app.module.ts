import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { SkinPredictComponent } from './skin-predict/skin-predict.component';
import { ResultViewComponent } from './skin-predict/result-view/result-view.component';
import { ChartsComponent } from './charts-container/charts.component';
import { SkinInformationComponent } from './skin-information/skin-information.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './charts-container/chart/chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SkinPredictComponent,
    ResultViewComponent,
    ChartsComponent,
    SkinInformationComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { PercentPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WebcamModule } from 'ngx-webcam';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './charts-container/chart/chart.component';
import { ChartsComponent } from './charts-container/charts.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material/material.module';
import { ModelUploadComponent } from './model-upload/model-upload.component';
import { SkinInformationComponent } from './skin-information/skin-information.component';
import { ResultViewComponent } from './skin-predict/result-view/result-view.component';
import { SkinPredictComponent } from './skin-predict/skin-predict.component';
import { appReducer } from './store/reducer';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SkinPredictComponent,
    ResultViewComponent,
    ChartsComponent,
    SkinInformationComponent,
    ChartComponent,
    ModelUploadComponent,
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    WebcamModule,
    NgxSpinnerModule,
    StoreModule.forRoot({ appState: appReducer }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [PercentPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

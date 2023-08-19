import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { TravelsComponent } from './travels/travels.component';
import { TravelsFormComponent } from './travels/travels-form/travels-form.component';
import { TravelsListComponent } from './travels/travels-list/travels-list.component';
import { TravelsService } from './travels/travels.service';
import { DataService } from './shared/data.service';
import { TravelsJourneyComponent } from './travels/travels-list/travels-journey/travels-journey.component';
import { TravelsStopComponent } from './travels/travels-list/travels-stop/travels-stop.component';
import { MapsPolylineService } from './shared/maps-polyline.service';

@NgModule({
  declarations: [
    AppComponent,
    TravelsComponent,
    TravelsFormComponent,
    TravelsListComponent,
    TravelsJourneyComponent,
    TravelsStopComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [TravelsService, DataService, MapsPolylineService],
  bootstrap: [AppComponent]
})
export class AppModule { }

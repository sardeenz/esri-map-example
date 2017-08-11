import { HttpModule } from '@angular/http';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdButtonModule, MdCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EsriLoaderService } from 'angular-esri-loader';
import { GeocodeService } from 'app/geocode.service';

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdCheckboxModule,
    MaterialModule
  ],
  providers: [EsriLoaderService, GeocodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

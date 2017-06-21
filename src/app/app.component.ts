import { User } from './user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { GeocodeService } from 'app/geocode.service';
import { EsriMapComponent } from 'app/esri-map/esri-map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public myForm: FormGroup; // our model driven form

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private geocodeService: GeocodeService, private _fb: FormBuilder) {
    iconRegistry.addSvgIcon(
      'city_seal',
      sanitizer.bypassSecurityTrustResourceUrl('assets/favicon.svg'));
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      address: ['', <any>Validators.required],
    });
  }

  save(model: User, isValid: boolean) {

    // get the address from the form
    model.address = this.myForm.get('address').value;
    // and you can transform it here if you want
    console.log('upperAddress = ', model.address.toUpperCase());


    console.log('address is ', model.address);
    console.log('isValid = ', isValid);
    console.log('model is ', model);

  }

  zoomToAddress() {
    // this.esriMapComponent.gotoView(this.myForm.get('callerAddress').value);
  }

}



import { Geodata } from './geodata';
import { User } from './user';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  geodata: Geodata;

  @ViewChild(EsriMapComponent) esriMapComponent: EsriMapComponent;

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

  /*
    The save function is called from the html template when the form is submitted.
    Take note that it attempts to conform to the User model interface
    called user.ts that we imported above.
  */
  save(model: User, isValid: boolean) {
    // get the address value from the form
    model.address = this.myForm.get('address').value;
    // and then you can transform it here if you want
    console.log('upperAddress = ', model.address.toUpperCase());

    // Here's the model etc.
    console.log('address is ', model.address);
    console.log('isValid = ', isValid);
    console.log('model is ', model);

    // pass the address to the map
    this.zoomToAddress(model.address);
  }

  zoomToAddress(address) {
    // geocode the address
    this.geocodeService.getGeometry(address).subscribe(geodata => this.geodata = geodata,
      err => console.error(err),
      () => {
        console.log('geodata = ', this.geodata);
        // this.setMarker(this.geodata);
        // this.isInsideCity(this.geodata);
      }
    );

}
}
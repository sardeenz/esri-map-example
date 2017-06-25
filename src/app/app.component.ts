import { Geocode } from './geocode';
// import { Geodata } from './geodata';
import { User } from './user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { EsriLoaderService } from 'angular2-esri-loader';
import { GeocodeService } from 'app/geocode.service';
import { EsriMapComponent } from 'app/esri-map/esri-map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public myForm: FormGroup; // our model driven form
  geocoderdata: Geocode;
  public mapView: __esri.MapView;
  public pointGraphic: __esri.Graphic;
  public markerSymbol: __esri.SimpleMarkerSymbol;
  public graphicsLayer: __esri.GraphicsLayer;

  @ViewChild(EsriMapComponent) esriMapComponent: EsriMapComponent;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private geocodeService: GeocodeService,
    private _fb: FormBuilder, private esriLoader: EsriLoaderService) {
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
    this.geocodeService.getGeometry(address).subscribe(geocoderdata => this.geocoderdata = geocoderdata,
      err => console.error(err),
      () => {
        // TODO: if this.geocoderdata.candidates[0].location is undefined, show an error
        // maybe show candidates in autocomplete too.
        this.zoomAndSetMarker(this.geocoderdata.candidates[0].location);
      }
    );
  }
  zoomAndSetMarker(coords) {
    this.esriLoader.require(['esri/Map', 'esri/layers/GraphicsLayer', 'esri/geometry/Point',
      'esri/symbols/SimpleMarkerSymbol', 'esri/Graphic'],
      (Map, GraphicsLayer, Point, SimpleMarkerSymbol, Graphic) => {
        console.log('x = ', coords.x);
        console.log('y = ', coords.y);
        this.markerSymbol = new SimpleMarkerSymbol({
          color: [226, 119, 40],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 2
          }
        });
        this.pointGraphic = new Graphic({
          geometry: new Point({
            longitude: coords.x,
            latitude: coords.y
          })
        });

        this.pointGraphic.symbol = this.markerSymbol;
        this.esriMapComponent.mapView.goTo({
          center: [coords.x, coords.y],
          zoom: 17
        });
        this.esriMapComponent.mapView.graphics.removeAll();
        this.esriMapComponent.mapView.graphics.add(this.pointGraphic);
        // this.mapView.graphics.removeAll();
        // this.mapView.graphics.add(this.pointGraphic);
      });

  }
}

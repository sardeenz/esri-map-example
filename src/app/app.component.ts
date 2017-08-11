import { Candidate, Geocode } from './geocode';
// import { Geodata } from './geodata';
import { User } from './user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { EsriLoaderService } from 'angular-esri-loader';
import { GeocodeService } from 'app/geocode.service';
import { EsriMapComponent } from 'app/esri-map/esri-map.component';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public myForm: FormGroup; // our model driven form
  geocoderdata: Geocode;
  public pointGraphic: __esri.Graphic;
  public markerSymbol: __esri.SimpleMarkerSymbol;
  public graphicsLayer: __esri.GraphicsLayer;
  public newAddress;
  term = new FormControl();
  items: Observable<Array<Candidate>>;

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
                    this.items = this.term.valueChanges
                 .debounceTime(400)
                 .distinctUntilChanged()
                 .switchMap(term => this.geocodeService.getGeometry(term));
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

    // get address data from Twitter
    // twitter: {
    //     consumer_key: 'O9wsZfidXPUtnNB21HCxrrXEq',
    //     consumer_secret: 'j9njg9Leu935sbipDz8jklPNfi7ipdV3DyKRLb2xBSwErv4vEp',
    //     access_token: '7374632-D07EYGE0IkClZj7ub9g2opd4l53MCaQuM61WuJfz6T',
    //     access_token_secret: 'tqd0MN5tb81lID9v8izSCEA77RnzMsg6uiE24qBKlfX3j'
    // }
    // pass the address to the map

    this.zoomToAddress(model.address);
  }

  zoomToAddress(address) {
    // geocode the address

    //     this.geocodeService.getGeometry(address).subscribe(geocoderdata => {
    //   console.log('my data', geocoderdata);
    // });



    // this.geocodeService.getGeometry(address).subscribe(geocoderdata => this.geocoderdata = geocoderdata,
    //   () => {
    //     // TODO: if this.geocoderdata.candidates[0].location is undefined, show an error
    //     // maybe show candidates in autocomplete too.
    //     console.log('this.geocoderdata', this.geocoderdata);
    //     this.zoomAndSetMarker(this.geocoderdata.candidates[0].location);
    //   }
    // );
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
        this.esriMapComponent.sceneView.goTo({
          center: [coords.x, coords.y],
          zoom: 17
        });
        // this.esriMapComponent.mapView.graphics.removeAll();
        this.esriMapComponent.sceneView.graphics.add(this.pointGraphic);
      });

  }
}

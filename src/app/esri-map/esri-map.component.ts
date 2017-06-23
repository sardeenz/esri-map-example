import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EsriLoaderService } from 'angular2-esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  public mapView: __esri.MapView;
  public pointGraphic: __esri.Graphic;
  public markerSymbol: __esri.SimpleMarkerSymbol;
  public graphicsLayer: __esri.GraphicsLayer;

  public mymap: any;
  // public maploaded = false;
  public maploaded: Element;

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;
  @ViewChild(EsriMapComponent) esriMapComponent: EsriMapComponent;

  constructor(private esriLoader: EsriLoaderService, ) { }

  ngOnInit() {
     // this.setMarker(data);
      return this.buildMap();
  }

  //   public setMarker(data) {

  //   console.log('this.data from address search= ', this.geodata);
  //   this.mapView.goTo({
  //     center: [this.geodata.features[0].geometry.x, this.geodata.features[0].geometry.y],
  //     zoom: 17
  //   });

  //   this.esriLoader.require(['esri/Map', 'esri/layers/GraphicsLayer', 'esri/geometry/Point',
  //     'esri/symbols/SimpleMarkerSymbol', 'esri/Graphic'],
  //     (Map, GraphicsLayer, Point, SimpleMarkerSymbol, Graphic) => {
  //       console.log('x = ', this.geodata.features[0].geometry.x);
  //       console.log('y = ', this.geodata.features[0].geometry.y);
  //       this.markerSymbol = new SimpleMarkerSymbol({
  //         color: [226, 119, 40],
  //         outline: { // autocasts as new SimpleLineSymbol()
  //           color: [255, 255, 255],
  //           width: 2
  //         }
  //       });
  //       this.pointGraphic = new Graphic({
  //         geometry: new Point({
  //           longitude: this.geodata.features[0].geometry.x,
  //           latitude: this.geodata.features[0].geometry.y
  //         })
  //       });

  //       this.pointGraphic.symbol = this.markerSymbol;
  //       this.mapView.graphics.removeAll();
  //       this.mapView.graphics.add(this.pointGraphic);
  //     });
  // }

  public buildMap() {

    return this.esriLoader.load({
      url: 'https://js.arcgis.com/4.3/'
    }).then(() => {
      this.esriLoader.loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/geometry/Point',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Graphic',
        'esri/layers/GraphicsLayer'
      ]).then(([
        Map,
        MapView,
        Point,
        SimpleMarkerSymbol,
        Graphic,
        GraphicsLayer
      ]) => {
        const mapProperties: __esri.MapProperties = {
          basemap: 'streets-night-vector'
        };

        const map = new Map(mapProperties);
        const mapViewProperties: __esri.MapViewProperties = {
          container: this.mapViewEl.nativeElement,
          center: [-78.65, 35.8],
          zoom: 12,
          map
        };
        this.mymap = map;
        this.mapView = new MapView(mapViewProperties);
        this.maploaded = this.esriLoader.isLoaded();
        console.log(this.maploaded);
      });
    });

  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EsriLoaderService } from 'angular-esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  public sceneView: __esri.SceneView;
  public maploaded: Element;

  public basemapchad: __esri.BasemapProperties;

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(private esriLoader: EsriLoaderService) { }

  ngOnInit() {
      return this.buildMap();
  }

  public buildMap() {
    return this.esriLoader.load({
      url: 'https://js.arcgis.com/4.4/'
    }).then(() => {
      this.esriLoader.loadModules([
        'esri/Map',
        'esri/views/SceneView',
        'esri/geometry/Point',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Graphic',
        'esri/layers/GraphicsLayer'
      ]).then(([
        Map,
        SceneView,
        Point,
        SimpleMarkerSymbol,
        Graphic,
        GraphicsLayer
      ]) => {

        const mapProperties: __esri.MapProperties = {
          basemap: 'streets-night-vector' as any as __esri.BasemapProperties
        };
        const map = new Map(mapProperties);
          const sceneViewProperties: __esri.SceneViewProperties = {
          container: this.mapViewEl.nativeElement,
          center: [-78.65, 35.8] as any as __esri.PointProperties,
          zoom: 12,
          map
        };
        this.sceneView = new SceneView(sceneViewProperties);
        this.maploaded = this.esriLoader.isLoaded();
        console.log(this.maploaded);
      });
    });

  }

}

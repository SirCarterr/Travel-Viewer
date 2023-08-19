import { AUTO_STYLE, animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps'
import { MapsPolylineService } from './shared/maps-polyline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('menuCollapsed', [
      state('open', style({
        'width': '400px',
        'height': '100%',
        'overflow': 'auto'
      })),
      state('open-full', style({
        'width': '100%',
        'height': '100%',
        'overflow': 'auto'
      })),
      state('closed', style({
        'width': '60px',
        'height': 'auto',
        'overflow': 'hidden'
      })),
      transition('* => closed', [
        query('@menuVisible', animateChild()),
        group([
          query(':self', [
            animate('0.5s ease-out')
          ]),
          query('@rotatedState', animateChild())
        ])
      ]),
      transition('closed => *', [
        group([
          query(':self', [
            animate('0.5s ease-out')
          ]),
          query('@rotatedState', animateChild())
        ]),
        query('@menuVisible', animateChild())
      ])
    ]),
    trigger('rotatedState', [
      state('open', style({ transform: 'rotate(0)' })),
      state('open-full', style({ transform: 'rotate(0)' })),
      state('closed', style({ transform: 'rotate(180deg)' })),
      transition('* <=> closed', animate('0.5s ease-out'))
    ]),
    trigger('menuVisible', [
      state('open', style({ opacity: 1, visibility: AUTO_STYLE })),
      state('open-full', style({ opacity: 1, visibility: AUTO_STYLE })),
      state('closed', style({ opacity: 0, visibility: 'hidden' })),
      transition('* <=> closed', animate('0.2s')),
    ]),
    trigger('mapCollapseFull', [
      state('open', style({ width: '100%', visibility: AUTO_STYLE })),
      state('open-full', style({ width: '0px', visibility: 'hidden' })),
      state('closed', style({ width: '100%', visibility: AUTO_STYLE })),
      transition('open-full <=> closed', animate('0.7s ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('map') mapElement?: ElementRef;
  map?: google.maps.Map;
  
  innerWidth: number = 0;
  state = 'open';
  
  polylineSubscription = new Subscription();
  markerSubscription = new Subscription();
  removeSubscription = new Subscription();

  private colors = ['#f70202', '#0223f7', '#7c02f7', '#7c02f7', '#f70289', '#ed3437'];
  travelPaths: google.maps.Polyline[] = [];
  marker?: google.maps.Marker;
  
  constructor (private mapsPolylineService: MapsPolylineService) {
    this.polylineSubscription = mapsPolylineService.polylineChanged.subscribe(data => {
      this.removeAll();
      this.setPolyline(data);
    });

    this.markerSubscription = mapsPolylineService.markerChanged.subscribe(data => {
      this.removeAll();
      this.setMarker(data);
    })

    this.removeSubscription = this.mapsPolylineService.removeChanged.subscribe(data => {
      this.removeAll();
    })
  }
  
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 900) {
      this.state = 'closed'
    }
  }
  
  ngAfterViewInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(51.1642292, 10.4541194),
      zoom: 7,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement?.nativeElement, mapProperties);
  }
  
  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth > 700 && this.innerWidth < 900) {
      this.state = 'closed'
    }
  }
  
  onClick() {
    if (this.innerWidth < 800) {
      (this.state === 'open' || this.state === 'open-full') ? this.state = 'closed' : this.state = 'open-full';
    } else {
      (this.state === 'open' || this.state === 'open-full') ? this.state = 'closed' : this.state = 'open';
    }
  }

  ngOnDestroy(): void {
    this.polylineSubscription.unsubscribe();
    this.markerSubscription.unsubscribe();
    this.removeSubscription.unsubscribe();
  }
  
  private removeAll() {
    this.marker?.setMap(null);
    for(let i = 0; i < this.travelPaths.length; i++) {
      this.travelPaths[i].setMap(null);
    }
    this.travelPaths = [];
  }

  private setPolyline(data: {lat: number, lng: number}[][]) {

    for(let i = 0; i < data.length; i++) {
      this.travelPaths.push(new google.maps.Polyline({
        path: data[i],
        geodesic: true,
        strokeColor: this.colors[i],
        strokeOpacity: 1.0,
        strokeWeight: 2
      }));
    }

    if(this.map){
      for(let path of this.travelPaths) {
        path.setMap(this.map);
      }

      let average = Math.floor(data.length/2);
      this.map.setCenter({
        lat: data[average][Math.floor(data[average].length/2)].lat,
        lng: data[average][Math.floor(data[average].length/2)].lng
      });
    }
  }

  private setMarker(coordinates: {lat: number, lng: number}) {
    this.marker = new google.maps.Marker({
      position: coordinates,
      map: this.map
    });

    if(this.map) {
      this.marker.setMap(this.map);
      this.map.setCenter(coordinates);
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TravelsService } from '../travels.service';
import { JourneysResponse } from 'src/app/models/journeys-response.model';
import { StopArrivals } from 'src/app/models/stop-arrivals.model';
import { StopDepatures } from 'src/app/models/stop-depatures.model';
import { MapsPolylineService } from 'src/app/shared/maps-polyline.service';

@Component({
  selector: 'app-travels-list',
  templateUrl: './travels-list.component.html',
  styleUrls: ['./travels-list.component.css']
})
export class TravelsListComponent implements OnInit, OnDestroy {
  isUpdating = false;

  selectedItemIndex?: number;

  subscriptionData: Subscription = new Subscription();
  subscriptionSearch: Subscription = new Subscription();
  response?: {data: object, type: string};

  $journeys = this.castTo<JourneysResponse>();
  $arrivals = this.castTo<StopArrivals>();
  $depatures = this.castTo<StopDepatures>();

  constructor(private travelsService: TravelsService, private mapsPolylineService: MapsPolylineService) {}
  
  ngOnInit(): void {
    this.subscriptionData = this.travelsService.searchDataChanged.subscribe(response => {
      this.response = response;
      this.selectedItemIndex = undefined;
      if(response.type === 'arrivals') {
        this.mapsPolylineService.SetNewMarker(
          this.$arrivals(response.data).arrivals[0].stop.location.latitude,
          this.$arrivals(response.data).arrivals[0].stop.location.longitude
        );
      } else if (response.type === 'depatures') {
        this.mapsPolylineService.SetNewMarker(
          this.$depatures(response.data).departures[0].stop.location.latitude,
          this.$depatures(response.data).departures[0].stop.location.longitude
        );
      } else {
        this.mapsPolylineService.RemoveMarker();
      }
    });
    this.subscriptionSearch = this.travelsService.isSearchingChanged.subscribe(value => {
      this.isUpdating = value;
    })
  }

  castTo<T>(): (data: any) => T {
    return (data) => data as T
  }

  onSelected(index: number) {
    this.selectedItemIndex = index;
  }
  
  ngOnDestroy(): void {
    this.subscriptionData.unsubscribe();
    this.subscriptionSearch.unsubscribe();
  }
}

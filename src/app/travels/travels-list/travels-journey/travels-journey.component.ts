import { Component, Input } from '@angular/core';

import { Journey } from 'src/app/models/journey.model';
import { MapsPolylineService } from 'src/app/shared/maps-polyline.service';

@Component({
  selector: 'app-travels-journey',
  templateUrl: './travels-journey.component.html',
  styleUrls: ['./travels-journey.component.css']
})
export class TravelsJourneyComponent {
  @Input() journey?: Journey;

  constructor (private mapsPolylineService: MapsPolylineService) {}

  setPolyline() {
    if(this.journey) {
      this.mapsPolylineService.SetNewPolyline(this.journey);
    }
  }
}

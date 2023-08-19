import { Component, Input } from '@angular/core';

import { Stop } from 'src/app/models/stop.model';

@Component({
  selector: 'app-travels-stop',
  templateUrl: './travels-stop.component.html',
  styleUrls: ['./travels-stop.component.css']
})
export class TravelsStopComponent {
  @Input() stop?: Stop;
  @Input() type: string = '';
}

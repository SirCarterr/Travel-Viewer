import { Subject } from "rxjs";
import { Journey } from "../models/journey.model";

export class MapsPolylineService {
    private polylineCoordinates: {lat: number, lng: number}[][] = [];
    private markerCoordinates?: {lat: number, lng: number};

    polylineChanged = new Subject<{lat: number, lng: number}[][]>();
    markerChanged = new Subject<{lat: number, lng: number}>();
    removeChanged = new Subject<boolean>();

    SetNewPolyline(journey: Journey) {
        this.polylineCoordinates = [];
        for(let i = 0; i < journey.legs.length; i++) {
            this.polylineCoordinates[i] = [];
            for (let p of journey.legs[i].polyline.features) {
                this.polylineCoordinates[i].push({lat: p.geometry.coordinates[1], lng: p.geometry.coordinates[0]});
            }
        }
        this.polylineChanged.next(this.polylineCoordinates);
    }

    SetNewMarker(lat: number, lng: number) {
        this.markerCoordinates = {lat: lat, lng: lng};
        this.markerChanged.next(this.markerCoordinates);
    }

    RemoveMarker() {
        this.removeChanged.next(true);
    }
}
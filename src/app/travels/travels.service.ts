import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { JourneysResponse } from "../models/journeys-response.model";
import { Location } from "../models/location.model";
import { StopArrivals } from "../models/stop-arrivals.model";
import { StopDepatures } from "../models/stop-depatures.model";

@Injectable()
export class TravelsService {
    searchDataChanged = new Subject<{data: object, type: string}>();
    searchLocationsChanged = new Subject<Location[]>();
    isSearchingChanged = new Subject<boolean>();

    isSearching = false;
    
    private journeys: JourneysResponse = new JourneysResponse();
    private arrivalStops: StopArrivals = new StopArrivals();
    private depatureStops: StopDepatures = new StopDepatures();
    private searchLocations: Location[] = [];

    setJourneys(journeys: JourneysResponse) {
        this.journeys = journeys;
        this.searchDataChanged.next({data: this.journeys, type: 'journeys'});
        this.isSearchingChanged.next(false);
    }

    setArrivals(arrivals: StopArrivals) {
        this.arrivalStops = arrivals;
        this.searchDataChanged.next({data: this.arrivalStops, type: 'arrivals'});
        this.isSearchingChanged.next(false);
    }

    setDepatures(departures: StopDepatures) {
        this.depatureStops = departures;
        this.searchDataChanged.next({data: this.depatureStops, type: 'depatures'});
        this.isSearchingChanged.next(false);
    }

    setSearchLocations(locations: Location[]) {
        this.searchLocations = locations;
        this.searchLocationsChanged.next(this.searchLocations.slice());
    }

    getJourneys() { return this.journeys; }

    getArrivarls() { return this.arrivalStops; }

    getDepatures() { return this.depatureStops; }

    getSearchLocations() { return this.searchLocations.slice(); }
}
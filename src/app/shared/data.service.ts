import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";

import { Location } from "../models/location.model";
import { FormSearch } from "../models/form-search.model";
import { StopArrivals } from "../models/stop-arrivals.model";
import { StopDepatures } from "../models/stop-depatures.model";
import { JourneysResponse } from "../models/journeys-response.model";
import { TravelsService } from "../travels/travels.service";

@Injectable()
export class DataService {
    constructor(private http: HttpClient, private travelsService: TravelsService) {}

    searchLocations(search: string) {
        return this.http.get<Location[]>(
            `https://v6.db.transport.rest/locations?query=${search}&addresses=false&poi=false`
        ).pipe(
            map(locations => {
                return locations.map(location => {
                    return {
                        id: location.id,
                        name: location.name
                    }
                })
            })
        );
    }

    fetchStopDepatures(search: FormSearch) {
        return this.http.get<StopDepatures>(
            `https://v6.db.transport.rest/stops/${search.fromId}/departures?results=10&tram=false&ferry=false&taxi=false&subway=false` +
            `${((search.depature !== '' && search.depature !== null) ? '&when=' + search.depature : '')}` +
            `&nationalExpress=${search.ice}` +
            `&national=${search.ic}` + 
            `&regionalExpress=${search.re}` +
            `&regional=${search.rb}` +
            `&suburban=${search.sbahn}` +
            `&bus=${search.bus}`
        ).pipe(
            map(depatures => {
                return depatures;
            }),
            tap(depatures => {
                //console.log(depatures);
                this.travelsService.setDepatures(depatures);
            })
        );
    }

    fetchStopArrivals(search: FormSearch) {
        return this.http.get<StopArrivals>(
            `https://v6.db.transport.rest/stops/${search.toId}/arrivals?results=10&tram=false&ferry=false&taxi=false&subway=false` + 
            `${((search.arrival !== '' && search.arrival !== null) ? '&when=' + search.arrival : '')}` +
            `&nationalExpress=${search.ice}` +
            `&national=${search.ic}` + 
            `&regionalExpress=${search.re}` +
            `&regional=${search.rb}` +
            `&suburban=${search.sbahn}` +
            `&bus=${search.bus}`
        ).pipe(
            map(arrivals => {
                return arrivals;
            }),
            tap(arrivals => {
                //console.log(arrivals);
                this.travelsService.setArrivals(arrivals);
            })
        );
    }

    fetchJourney(search: FormSearch) {
        return this.http.get<JourneysResponse>(
            `https://v6.db.transport.rest/journeys?from=${search.fromId}&to=${search.toId}&results=10&tram=false&ferry=false&taxi=false&subway=false&polylines=true` +
            `${((search.depature !== '' && search.depature !== null) ? '&when=' + search.depature : '')}` +
            `${((search.arrival !== '' && search.arrival !== null) ? '&when=' + search.arrival : '')}` +
            `&nationalExpress=${search.ice}` +
            `&national=${search.ic}` + 
            `&regionalExpress=${search.re}` +
            `&regional=${search.rb}` +
            `&suburban=${search.sbahn}` +
            `&bus=${search.bus}`
        ).pipe(
            map(journeys => {
                return journeys;
            }),
            tap(journeys => {
                //console.log(journeys);
                this.travelsService.setJourneys(journeys);
            })
        );
    }
}
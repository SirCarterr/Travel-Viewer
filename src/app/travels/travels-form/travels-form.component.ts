import { AUTO_STYLE, animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime, fromEvent, map, switchMap, tap } from 'rxjs';

import { DataService } from 'src/app/shared/data.service';
import { currentDatetimeValidator } from 'src/app/shared/date-validator.directive';
import { TravelsService } from '../travels.service';

@Component({
  selector: 'app-travels-form',
  templateUrl: './travels-form.component.html',
  styleUrls: ['./travels-form.component.css'],
  animations: [
    trigger('collapseOptions', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate('0.3s ease-in')),
      transition('true => false', animate('0.3s ease-out'))
    ]),
    trigger('collapseForm', [
      state('false', style({ opacity: 1, height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ opacity: 0, height: '0', visibility: 'hidden' })),
      transition('false => true', animate('0.5s ease-in', keyframes([
        style({ opacity: 1, height: AUTO_STYLE, visibility: AUTO_STYLE, offset: 0 }),
        style({ opacity: 0, height: AUTO_STYLE, visibility: AUTO_STYLE, offset: 0.2 }),
        style({ opacity: 0, height: '0', visibility: 'hidden', offset: 1 })
      ]))),
      transition('true => false', animate('0.5s ease-out', keyframes([
        style({ opacity: 0, height: '0', visibility: 'hidden', offset: 0 }),
        style({ opacity: 0, height: AUTO_STYLE, visibility: 'hidden', offset: 0.8 }),
        style({ opacity: 1, height: AUTO_STYLE, visibility: AUTO_STYLE, offset: 1 }),
      ])))
    ]),
    trigger('rotatedState', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(180deg)' })),
      transition('true <=> false', animate('0.5s ease-out'))
    ])
  ]
})
export class TravelsFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fromPlaceSearch') fromPlaceSearch?: ElementRef;
  @ViewChild('toPlaceSearch') toPlaceSearch?: ElementRef;

  tripForm: FormGroup = new FormGroup({});
  minDate = Date();
  formCollapsed = false;
  optionsCollapsed = true;

  searchedLocations: {id: string, name: string}[] = [];
  showFromSearches = false;
  showToSearches = false;
  isSearchingFrom = false;
  isSearchingTo = false;

  isPending = false;
  subscriptionPending: Subscription = new Subscription();
  
  constructor(private dataService: DataService, private travelsService: TravelsService) {}
  
  ngOnInit(): void {
    this.initForms();
    this.subscriptionPending = this.travelsService.isSearchingChanged.subscribe(value => {
      this.isPending = value;
    });
  }
  
  ngAfterViewInit(): void {
    this.initSearch();
  }
  
  OnFormCollapse() {
    this.formCollapsed = !this.formCollapsed;
  }

  OnMoreOptions() {
    this.optionsCollapsed = !this.optionsCollapsed;
  }

  setFromPlace(data: {id: string, name: string}) {
    this.tripForm.patchValue({
      from: data.name,
      fromId: data.id
    });
    this.showFromSearches = false;
  }

  setToPlace(data: {id: string, name: string}) {
    this.tripForm.patchValue({
      to: data.name,
      toId: data.id
    });
    this.showToSearches = false;
  }

  onSubmitTrip() {
    this.travelsService.isSearchingChanged.next(true);
    if((this.tripForm.value['from'] && this.tripForm.value['from'] !== '') && (this.tripForm.value['to'] && this.tripForm.value['to'] !== '')) {  
      this.dataService.fetchJourney(this.tripForm.value).subscribe();
    } else if ((this.tripForm.value['from'] && this.tripForm.value['from'] !== '') && (!this.tripForm.value['to'] && this.tripForm.value['to'] === '')) {
      this.dataService.fetchStopDepatures(this.tripForm.value).subscribe();
    } else if ((!this.tripForm.value['from'] && this.tripForm.value['from'] === '') && (this.tripForm.value['to'] && this.tripForm.value['to'] !== '')) {
      this.dataService.fetchStopArrivals(this.tripForm.value).subscribe();
    } else {
      alert('Cannot find travels on empty "from" and "to" fields!');
    }
  }

  ngOnDestroy(): void {
    this.subscriptionPending.unsubscribe();
  }

  private initForms() {
    this.tripForm = new FormGroup({
      'from': new FormControl('', [Validators.minLength(3)]),
      'to': new FormControl('', [Validators.minLength(3)]),
      'fromId': new FormControl(''),
      'toId': new FormControl(''),
      'depature': new FormControl(null, currentDatetimeValidator()),
      'arrival': new FormControl(null, currentDatetimeValidator()),
      'ice': new FormControl(true),
      'ic': new FormControl(true),
      're': new FormControl(true),
      'rb': new FormControl(true),
      'sbahn': new FormControl(true),
      'bus': new FormControl(true)
    });
  }

  private initSearch() {
    const searchFrom$ = fromEvent(this.fromPlaceSearch?.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      tap(() => this.isSearchingFrom = true),
      switchMap((term) => term ? this.dataService.searchLocations(term) : []),
      tap(() => {
        this.isSearchingFrom = false;
        this.showFromSearches = true;
        this.showToSearches = false;
        this.isSearchingTo = false;
      })
    );

    searchFrom$.subscribe(data => {
      this.isSearchingFrom = false;
      this.searchedLocations = data;
    })

    const searchTo$ = fromEvent(this.toPlaceSearch?.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      tap(() => this.isSearchingTo = true),
      switchMap((term) => term ? this.dataService.searchLocations(term) : []),
      tap(() => {
        this.isSearchingTo = false;
        this.showToSearches = true;
        this.showFromSearches = false;
        this.isSearchingFrom = false;
      })
    );

    searchTo$.subscribe(data => {
      this.isSearchingTo = false;
      this.searchedLocations = data;
    })
  }
}

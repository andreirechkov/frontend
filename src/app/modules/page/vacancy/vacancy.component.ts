import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {ApiService} from '../../../shared/service/api.service';

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit, OnDestroy {
  public zoom: number = 15;
  public lat: number = 47.23629625;
  public lng: number = 39.71261501;
  public selectAd: string = '';
  public fileToUpload: File = null;
  public vacancy: any = [];
  public userId: string = null;
  public images: Array<any> = [{
    image: ''
  }]

  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  public id: number;
  private destroy$ = new Subject();
  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.routeSubscription = route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params=>this.id=params['id']);
    this.querySubscription = route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (queryParam: any) => {
          this.id = queryParam['id'];
        }
      );
  }

  ngOnInit(): void {
    this.userId = this.api.getUserId();
    this.api.getVacancy(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(vacancy => {
        console.log(vacancy);
     this.vacancy = vacancy;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
}

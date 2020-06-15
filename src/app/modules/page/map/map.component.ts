import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/service/api.service';
import { AgmInfoWindow } from '@agm/core';
import { marker } from '../../../shared/interface/marker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  public zoom: number = 13;
  public infoWindow: string;
  public redirectId: number;
  public lat: number = 47.23629625;
  public lng: number = 39.71261501;
  public markers: Array<marker> = [];
  public filter: Array<marker> = [];

  private previousIW: AgmInfoWindow;
  private test: AgmInfoWindow;
  private destroy$ = new Subject();

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getNewsAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        res.forEach(vacancy => {
          const coordinate = vacancy.coordinate.split(",");
          this.markers.push({
            lat: parseFloat(coordinate[0]),
            lng: parseFloat(coordinate[1]),
            content: vacancy.content,
            nameNews: vacancy.nameNews,
            id: vacancy.id,
            draggable: true
          });
          this.filter = this.markers;
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public filterMarker(key: string): void {
    if (this.previousIW) {
      this.previousIW.close();
    }
    this.previousIW = this.test;
    if (key === '') {
      this.markers = this.filter;
    } else {
      this.markers = this.filter.filter(marker => marker.nameNews === key);
    }
  }

  clickedMarker(infoWindow: AgmInfoWindow, i: number) {
    if (this.previousIW) {
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
    this.infoWindow = this.markers[i].content;
    this.redirectId = this.markers[i].id;
  }

  public redirect(): void {
    this.router.navigate([`/vacancy`], {
      queryParams: { id: this.redirectId } });
  }
}

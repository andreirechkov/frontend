import { Component, OnDestroy, OnInit } from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../shared/service/api.service';
import {element} from 'protractor';
import {SettingEditComponent} from '../../components/setting-edit/setting-edit.component';
import {BsModalService} from 'ngx-bootstrap';
import {DeleteNewsComponent} from '../../components/delete-news/delete-news.component';
import {EditNewsComponent} from '../../components/edit-news/edit-news.component';

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
  public fileToUpload: File = null;
  public vacancy: any = [];
  public userId: string = null;
  public images: Array<any> = [];
  public id: number;

  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  private destroy$ = new Subject();

  constructor(
    private api: ApiService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router
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
        this.vacancy = vacancy;
        Object.keys(this.vacancy).forEach(element => {
          if(element.includes('image') && this.vacancy[element]) {
            this.images.push(this.vacancy[element]);
          }
        });
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public delete(): void {
    const initialState = { vacancyId: this.vacancy.id };

    const modal = this.modalService
      .show(DeleteNewsComponent, { initialState });

    modal.content
      .onDeleteVacancy
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/person']);
        modal.hide()
      });
  }

  public edit(): void {
    const initialState = { vacancy: this.vacancy };

    const modal = this.modalService
      .show(EditNewsComponent, { initialState });

    modal.content
      .onEditVacancy
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.api.getVacancy(this.id))
      )
      .subscribe(x => {
        this.vacancy = x;
        modal.hide()
      });
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../shared/service/api.service';
import {BsModalService} from 'ngx-bootstrap';
import {DeleteNewsComponent} from '../../components/delete-news/delete-news.component';
import {EditNewsComponent} from '../../components/edit-news/edit-news.component';
import {marker} from '../../../shared/interface/marker';
import { User } from '../../../shared/interface/user';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit, OnDestroy {
  public zoom: number = 15;
  public lat: number;
  public lng: number;
  public fileToUpload: File = null;
  public vacancy: any = [];
  public userId: string = null;
  public images: Array<any> = [];
  public id: number;
  public markers: marker[] = [];
  public userCreatedVacancy: User;

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
        const coordinate = this.vacancy.coordinate.split(",");
        this.lat = parseFloat(coordinate[0]);
        this.lng = parseFloat(coordinate[1]);
        this.markers.push({
          lat: this.lat,
          lng: this.lng,
          draggable: true
        });
        Object.keys(this.vacancy).forEach(element => {
          if(element.includes('image') && this.vacancy[element]) {
            this.images.push(this.vacancy[element]);
          }
        });
    })
    // this.api.getUser(this.vacancy.user)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(res => {
    //     this.userCreatedVacancy = res;
    //   });
  }

  public addContact(): void {
    const body = {
      messages: [],
      participants: [this.api.getUserName(), this.userCreatedVacancy.username]
    };
    console.log(body);
    // this.api.getChannelUsername(this.userCreatedVacancy.username)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((contact) => {
    //     let exists = true;
    //     contact.forEach(item => {
    //       if (item.participants.includes(this.api.getUserName())) {
    //         exists = false;
    //       }
    //     })
    //     if (exists) {
    //       this.api.setContactChannel(body).pipe(takeUntil(this.destroy$))
    //         .subscribe(() => {},
    //           error => console.log(error),
    //           () => {
    //             this.router.navigate(['/chat-messages'])
    //           });
    //     } else {
    //       // this.router.navigate(['/chat-messages'])
    //     }
    //   });
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
}

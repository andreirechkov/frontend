import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../shared/interface/user';
import { BsModalService } from 'ngx-bootstrap';
import { SettingEditComponent } from '../../components/setting-edit/setting-edit.component';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/service/api.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  public user: User;
  public id: number;
  public defaultImage: any = "../assets/avatar-3.png";

  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  private destroy$ = new Subject();

  constructor(private api: ApiService,
              private modalService: BsModalService,
              private router: Router,
              private route: ActivatedRoute) {
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
    this.api.getUser(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addContact(username: string): void {
    const body = {
      messages: [],
      participants: [this.api.getUserName(), username]
    }
    this.api.getChannelUsername(username)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((contact) => {
      let exists = true;
      contact.forEach(item => {
        if (item.participants.includes(this.api.getUserName())) {
          exists = false;
        }
      })
      if (exists) {
        this.api.setContactChannel(body).pipe(takeUntil(this.destroy$))
          .subscribe(() => {},
            error => console.log(error),
            () => {
            this.router.navigate(['/chat-messages'])
          });
      } else {
        this.router.navigate(['/chat-messages'])
      }
    });
  }

  public edit(): void {
    const initialState = { user: this.user };

    const modal = this.modalService
      .show(SettingEditComponent, { initialState });

    modal.content
      .onSettingEdit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.api.getUser())
      )
      .subscribe(x => {
        this.user = x;
        modal.hide();
      });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../shared/interface/user';
import { AuthService } from '../../../shared/service/auth.service';
import { BsModalService } from 'ngx-bootstrap';
import { SettingEditComponent } from '../setting-edit/setting-edit.component';
import { switchMap, takeUntil } from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SettingCreateComponent} from '../setting-create/setting-create.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  public user: User;
  public id: number;

  constructor(private api: AuthService,
              private modalService: BsModalService,
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


  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  private destroy$ = new Subject();

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

  public create(): void {
    const initialState = {user: this.user};

    const modal = this.modalService
      .show(SettingCreateComponent, {initialState});

    modal.content
      .onSettingCreate
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.api.getUser())
      )
      .subscribe(() => {
        modal.hide();
      });
  }
}

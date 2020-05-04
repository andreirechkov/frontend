import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { User } from '../../../shared/interface/user';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit, OnDestroy {
  public user: Array<User>

  private destroy$ = new Subject();
  constructor(private api: AuthService) { }

  ngOnInit(): void {
    this.api.getUserAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Array<User>) => {
      this.user = res;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../shared/interface/user';
import { ApiService } from '../../../shared/service/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {
  public news: Array<any> = [];
  public users: Array<User>;

  private destroy$ = new Subject();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getNewsAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
      this.news = res;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

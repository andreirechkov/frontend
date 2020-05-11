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
  public filterUsers: Array<User> = [];
  public advertising: string = 'Аренда помещения';

  private destroy$ = new Subject();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getNewsAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
       this.news = res;
       this.news.forEach(item => {
         if (item.nameNews === 'Аренда помещения') {
           this.filterUsers.push(item);
         }
       });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public advertisingFilter(advertising: string): void {
    this.advertising = advertising;
    this.filterUsers = [];
    this.news.forEach(item => {
      if (item.nameNews === advertising) {
        this.filterUsers.push(item);
      }
    })
  }
}

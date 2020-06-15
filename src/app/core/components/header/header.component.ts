import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { User } from '../../../shared/interface/user';
import { ApiService } from '../../../shared/service/api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  public sideNavList = [{name: 'Главная', link: '/home',}, {name: 'Пользователи', link: '/users',},
                        {name: 'Чат', link: '/chat-messages'}, { name: 'Объявления', link: '/person'},
                        {name: 'Карты', link: '/maps'}];
  public image: string = '';

  private destroy$ = new Subject();

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) {
    this.api.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.image = user?.person?.image;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public logout(): void {
    this.auth.logout();
  }
}

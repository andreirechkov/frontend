import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../shared/service/api.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-sign-register',
  templateUrl: './sign-register.component.html',
  styleUrls: ['./sign-register.component.scss']
})
export class SignRegisterComponent implements OnInit, OnDestroy {

  constructor(private api: ApiService) { }

  public destroy$ = new Subject();

  ngOnInit() {
    this.api.getLogin('test')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
          console.log(data);
        },
        error => console.log(error))
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

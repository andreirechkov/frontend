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

  public showRegisterCard = false;
  constructor(private api: ApiService) { }

  public destroy$ = new Subject();

  ngOnInit() {
  }

  public clickRegist(): void {
    this.showRegisterCard = !this.showRegisterCard;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


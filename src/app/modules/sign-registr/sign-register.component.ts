import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../shared/service/api.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interface/user';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-register',
  templateUrl: './sign-register.component.html',
  styleUrls: ['./sign-register.component.scss']
})
export class SignRegisterComponent implements OnInit, OnDestroy {

  public showRegisterCard = false;
  public form: FormGroup;
  public destroy$ = new Subject();

  private respErrors;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clickReg(): void {
    this.showRegisterCard = !this.showRegisterCard;
  }

  public clickSignIn() {
    const user: User = Object.assign({}, this.form.value);
    this.api.signIn(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['home']),
        (err: HttpErrorResponse) => {
          if (!err.error.status && !err.error.exception) {
            this.respErrors = err.error;
          }
        },
        () => null);
  }

  public hasError(controlName: string): boolean {
    return (
      (this.form.get(controlName).dirty
        && this.form.get(controlName).invalid
      ) || this.respErrors && this.respErrors[controlName]
    );
  }

  public textError(controlName: string): string {
    if (!this.hasError(controlName)) {
      return '';
    }

    if (this.form.get(controlName).errors) {
      if (this.form.get(controlName).errors.required) {
        return `${controlName} is required`;
        } else if (this.form.get(controlName).errors.email) {
          return `${controlName} is not valid email`;
        } else if (this.form.get(controlName).errors.validLatin) {
          return `${controlName} should contain only latin characters`;
        }
      }

    if (this.respErrors && this.respErrors[controlName]) {
      return this.respErrors[controlName];
    }
  }
}


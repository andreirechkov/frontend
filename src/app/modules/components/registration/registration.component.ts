import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public destroy$ = new Subject();
  public respErrors;

  constructor(
    private api: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      person: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        typeUser: ['', [Validators.required]]
      })
    });
  }

  public hasError(controlName: string): boolean {
    return (
      (this.form.get(controlName)?.dirty
        && this.form.get(controlName).invalid
      ) || this.respErrors && this.respErrors[controlName]
    );
  }

  public newUser(): void {
    const user = Object.assign({}, this.form.value);
    this.api.register(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.api.registerContact(`${res.id}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe();
        this.router.navigate(['login'], {
        queryParams: {
          registered: true
        }})
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

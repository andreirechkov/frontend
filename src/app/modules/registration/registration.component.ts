import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public formReg: FormGroup;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formReg = this.formBuilder.group({
      username: ['', []],
      password: ['', []],
      person: this.formBuilder.group({
        firstName: ['', []],
        lastName: ['', []],
        email:    ['', []],
        phone:    ['', []],
        typeUser:  ['', []],
      })
    });
  }

  public newUser(): void {
    const user = Object.assign({}, this.formReg.value);
    this.api.postNewUser(user).subscribe(() => this.router.navigate(['home']));
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  public redirect(key: string): void {
    if (this.api.getUserId()) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate([key]);
    }
  }
}

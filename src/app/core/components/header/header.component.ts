import { Component, Inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sideBar: SidenavComponent;

  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
  ) { }

  ngOnInit(): void {
  }

  public click(): void {
    this.sideBar.toggle();
  }

  public logout(): void {
    this.auth.logout();
  }

}

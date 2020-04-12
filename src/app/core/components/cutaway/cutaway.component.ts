import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cutaway',
  templateUrl: './cutaway.component.html',
  styleUrls: ['./cutaway.component.scss']
})
export class CutawayComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  public clickOnSign(): void {
    this.router.navigate(['login']);
  }
}
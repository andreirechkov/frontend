import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import {User} from '../../../shared/interface/user';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  public news: Array<any> = [];
  public users: Array<User>;


  constructor(private api: AuthService) {}

  ngOnInit(): void {
    this.api.getNewsAll().subscribe(res => {
      this.news = res;
    });
  }
}

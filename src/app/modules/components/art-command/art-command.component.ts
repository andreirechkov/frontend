import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/service/api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../../shared/interface/user';

@Component({
  selector: 'app-art-command',
  templateUrl: './art-command.component.html',
  styleUrls: ['./art-command.component.scss']
})
export class ArtCommandComponent implements OnInit, OnDestroy {
  public rounds = [];
  public selectCommandOne;
  public selectCommandTwo;
  public vacancyId: number;
  public defaultImage: any = "../assets/avatar-3.png";
  public person: User;
  public images: Array<any> = [];
  public artCommand = [];
  public switch = 1;

  private destroy$ = new Subject();

  constructor(private api: ApiService,
              private router: Router) {
    this.api.getNewsAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.artCommand = res.filter(data => data.nameNews === 'Арт-команда')
          .sort(() => Math.random() - 0.5);
        let counterRound = 1;
        this.selectCommandOne = {
          user: this.artCommand[0].user,
          counter: 0,
          vacancyId: this.artCommand[0].id
        };
        this.selectCommandTwo = {
          user: this.artCommand[0].user,
          counter: 0,
          vacancyId: this.artCommand[1].id
        };
        Object.keys(this.artCommand[0]).forEach(element => {
          if (element.includes('image')) {
            const round = {
              round: counterRound,
              users: [
                { user: this.artCommand[0].user, image: this.artCommand[0][`image${counterRound}`]},
                { user: this.artCommand[1].user, image: this.artCommand[1][`image${counterRound}`]}
              ]
            };
            counterRound = counterRound + 1;
            this.rounds.push(round);
          }
        });
        this.rounds.push({
          round: 5,
          users: [
            { user: this.artCommand[0].user, image: this.artCommand[0][`image1`] },
            { user: this.artCommand[1].user, image: this.artCommand[1][`image2`] }
          ]
        })
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public checkCommand(round: number, user: number): void {
    if (this.switch < 6) {
      if (user === this.selectCommandOne.user) {
        this.selectCommandOne.counter = this.selectCommandOne.counter + 1;
      } else {
        this.selectCommandTwo.counter = this.selectCommandTwo.counter + 1;
      }
      this.switch = this.switch + 1;
    }
    if (this.switch === 6) {
      let userId: number;
      if (this.selectCommandOne.counter > this.selectCommandTwo.counter) {
        userId = this.selectCommandOne.user;
        this.vacancyId = this.selectCommandOne.vacancyId;
      } else {
        userId = this.selectCommandTwo.user;
        this.vacancyId = this.selectCommandTwo.vacancyId;
      }
      this.api.getUser(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(user => this.person = user);
    }
  }

  public redirect(): void {
    this.router.navigate([`/vacancy`], {
      queryParams: { id: this.vacancyId } });
  }
}

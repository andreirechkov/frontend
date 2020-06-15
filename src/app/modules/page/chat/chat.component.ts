import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../../../shared/service/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public netImage: any = "../assets/avatar-3.png";
  public userChannel: any;
  public user: any;
  public dropMenu = [];
  public filterItemMenu = [];
  public contactItem = [];

  private destroy$ = new Subject();

  constructor(
    private api: ApiService
  ) {}

  ngOnInit(): void {
    forkJoin(this.api.getChannel(this.api.getUserName()),
      this.api.getUserAll().pipe(takeUntil(this.destroy$))
    ).pipe(takeUntil(this.destroy$))
      .subscribe(([participants, userAll]) => {
        participants.forEach((participant, index) => {
          const array = participant.participants.filter(player => player !== this.api.getUserName());
          this.contactItem.push({id: index + 1, username: array[0], channelId: participant.id, messages: participant.messages});
        });
        this.dropMenu = this.filterItemMenu = this.contactItem;
        userAll.filter(user => this.contactItem.some(participant => {
          if (user.username === participant.username) {
            participant['name'] = `${user.person.firstName} ${user.person.lastName}`
            if (user.person.image) {
              participant['image'] = user.person.image;
            } else {
              participant['image'] = this.netImage;
            }
          }
        }));
      });
  }

  public changeShowListUser(user: object): void {
    this.contactItem = this.filterItemMenu;
    user ? this.contactItem = this.contactItem.filter(item => item === user) : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public chatChannel(user: object): void {
    this.userChannel = user;
  }
}

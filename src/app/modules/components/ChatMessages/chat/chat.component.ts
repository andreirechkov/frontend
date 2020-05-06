import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/service/auth.service';
import { forkJoin, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil} from 'rxjs/operators';

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
  public contactItem = [];

  private destroy$ = new Subject();
  public selected: any;

  constructor(private api: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    forkJoin(this.api.getChannel(this.api.getUserName()),
            this.api.getUserAll().pipe(takeUntil(this.destroy$))
    ).pipe(takeUntil(this.destroy$))
      .subscribe(([participants, userAll]) => {
        participants.forEach((participant, index) => {
          const array = participant.participants.filter(player => player !== this.api.getUserName());
          this.dropMenu.push({id: index + 1, username: array[0], channelId: participant.id, messages: participant.messages});
        })
        this.contactItem = userAll.filter(player => player.username !== this.api.getUserName());
        userAll.filter(user => this.dropMenu.some(participant => {
          if (user.username === participant.username) {
            participant['name'] = `${user.person.firstName} ${user.person.lastName}`
            if (user.person.image) {
              participant['image'] = user.person.image;
            } else {
              participant['image'] = this.netImage;
            }
          }
        }))
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public chatChannel(user: object): void {
    this.userChannel = user;
  }
}

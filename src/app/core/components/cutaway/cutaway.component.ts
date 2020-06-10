import { Component } from '@angular/core';
import { ApiService } from '../../../shared/service/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cutaway',
  templateUrl: './cutaway.component.html',
  styleUrls: ['./cutaway.component.scss']
})
export class CutawayComponent {
  public image = [];

  private destroy$ = new Subject();

  constructor(private api: ApiService) {
    this.api.getUserAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        res.forEach((user, item) => {
          console.log(user);
          if (item < 6) {
            this.image.push(user?.person.image)
          }
        });
        console.log(this.image);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

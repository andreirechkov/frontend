import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/service/api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-art-command',
  templateUrl: './art-command.component.html',
  styleUrls: ['./art-command.component.scss']
})
export class ArtCommandComponent implements OnInit, OnDestroy {
  public round: any;
  public artCommand = [];
  private destroy$ = new Subject();

  constructor(private api: ApiService) {
    this.api.getNewsAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.artCommand = res.filter(data => data.nameNews === 'Арт-команда');
    });
  }

  ngOnInit(): void {
  }

  public checkCommand(): void {

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

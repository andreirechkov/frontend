import { Component, EventEmitter } from '@angular/core';
import { ApiService } from '../../../shared/service/api.service';
import { BsModalRef } from 'ngx-bootstrap';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-delete-news',
  templateUrl: './delete-news.component.html',
  styleUrls: ['./delete-news.component.scss']
})
export class DeleteNewsComponent {

  public vacancyId: any;
  public onDeleteVacancy: EventEmitter<number> = new EventEmitter();

  private destroy$ = new Subject();
  constructor(private bsModalRef: BsModalRef,
    private api: ApiService
  ) { }

  public closeModal(): void {
    this.bsModalRef.hide();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public delete(): void {
    this.api.deleteVacancy(this.vacancyId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
          console.log(res);
          this.onDeleteVacancy.emit(res)
        },
        error => console.log(error));
    this.bsModalRef.hide();
  }
}

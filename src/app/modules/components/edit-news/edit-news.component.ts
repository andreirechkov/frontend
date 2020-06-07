import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { ApiService } from '../../../shared/service/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent {
  public vacancy;
  public form: FormGroup;
  public fileToUpload: File = null;
  public onEditVacancy: EventEmitter<number> = new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
    this.initForm();
  }

  private destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  public initForm(): void {
    this.form = this.formBuilder.group({
      user: [this.vacancy.user, [Validators.required]],
      vacancy: [this.vacancy.vacancy, [Validators.required]],
      workTime: [this.vacancy.workTime, [Validators.required]],
      experience: [this.vacancy.experience, [Validators.required]],
      content: [this.vacancy.content, [Validators.required]],
      price: [this.vacancy.price, [Validators.required]],
      category: [this.vacancy.category, [Validators.required]],
      coordinate: [this.vacancy.coordinate, [Validators.required]],
      email: [this.vacancy.email, [Validators.required]],
      phone: [this.vacancy.phone, [Validators.required]],
    });
  }

  public closeModal(): void {
    this.bsModalRef.hide();
  }

  public saveChange(): void {
    const vacancy = Object.assign({}, this.form.value);
    this.api.editVacancy(vacancy, this.vacancy.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
          console.log(res);
          this.onEditVacancy.emit(res)
        },
        error => console.log(error));
    this.bsModalRef.hide();
  }
}

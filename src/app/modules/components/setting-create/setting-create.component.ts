import { Component, OnDestroy } from '@angular/core';
import { User } from '../../../shared/interface/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from '../../../shared/service/api.service';

@Component({
  selector: 'app-setting-create',
  templateUrl: './setting-create.component.html',
  styleUrls: ['./setting-create.component.scss']
})
export class SettingCreateComponent implements OnDestroy {
  public user: User;
  public form: FormGroup;
  public fileToUpload: File = null;

  private destroy$ = new Subject();

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      user: [this.user.id, [Validators.required]],
      nameNews: ['', [Validators.required]],
      content: ['', [Validators.required]],
      coordinate: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  public closeModal(): void {
    this.bsModalRef.hide();
  }

  public onFileChange(files: FileList): void {
    this.fileToUpload = files.item(0);
  }

  public saveChange(): void {
    const user = Object.assign({}, this.form.value);
    this.api.setNews(user, this.fileToUpload)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.bsModalRef.hide();
  }
}

import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from '../../../shared/interface/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/service/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
  styleUrls: ['./setting-edit.component.scss']
})
export class SettingEditComponent implements OnInit, OnDestroy {
  public user: User;
  public form: FormGroup;
  public fileToUpload: File = null;
  public onSettingEdit: EventEmitter<number> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef,
              private formBuilder: FormBuilder,
              private api: AuthService,
              private cd: ChangeDetectorRef) { }

  private destroy$ = new Subject();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      city: [this.user.person.city, [Validators.required]],
      content: [this.user.person.content, [Validators.required]],
      area: [this.user.person.area, [Validators.required]],
      email: [this.user.person.email, [Validators.required]],
      firstName: [this.user.person.firstName, [Validators.required]],
      lastName: [this.user.person.lastName, [Validators.required]],
      phone: [this.user.person.phone, [Validators.required]],
      typeUser: [this.user.person.typeUser, [Validators.required]],
      // userLinks: this.formBuilder.array([]),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public closeModal(): void {
    this.bsModalRef.hide();
  }

  public onFileChange(files: FileList): void {
    this.fileToUpload = files.item(0);
  }

  public saveChange(): void {
    const user = Object.assign({}, this.form.value);
    this.api.profile(user, this.fileToUpload)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.onSettingEdit.emit(res),
        error => console.log(error));
    this.bsModalRef.hide();
  }
}

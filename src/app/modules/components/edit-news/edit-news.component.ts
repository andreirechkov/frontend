import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { ApiService } from '../../../shared/service/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { marker } from '../../../shared/interface/marker';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit{
  public zoom: number = 15;
  public lat: number;
  public lng: number;
  public markers: marker[] = [];
  public vacancy;
  public form: FormGroup;
  public fileToUpload: File = null;
  public onEditVacancy: EventEmitter<number> = new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  private destroy$ = new Subject();

  ngOnInit(): void {
    const coordinate = this.vacancy.coordinate.split(",");
    this.lat = parseFloat(coordinate[0]);
    this.lng = parseFloat(coordinate[1]);
    this.markers.push({
      lat: this.lat,
      lng: this.lng,
      draggable: true
    });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  public initForm(): void {
    this.form = this.formBuilder.group({
      user: [this.vacancy.user, []],
      vacancy: [this.vacancy.vacancy, []],
      workTime: [this.vacancy.workTime, []],
      experience: [this.vacancy.experience, []],
      content: [this.vacancy.content, []],
      price: [this.vacancy.price, []],
      category: [this.vacancy.category, []],
      coordinate: [this.vacancy.coordinate, []],
      email: [this.vacancy.email, []],
      phone: [this.vacancy.phone, []],
    });
  }

  public closeModal(): void {
    this.bsModalRef.hide();
  }

  public saveChange(): void {
    const vacancy = Object.assign({}, this.form.value);
    vacancy.coordinate = `${this.markers[0].lat}, ${this.markers[0].lng}`;
    this.api.editVacancy(vacancy, this.vacancy.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
          console.log(res);
          this.onEditVacancy.emit(res)
        },
        error => console.log(error));
    this.bsModalRef.hide();
  }

  public mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
    if (this.markers.length > 1) {
      this.markers.splice(0,1);
    }
  }
}

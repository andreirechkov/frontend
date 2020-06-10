import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../../shared/service/api.service';
import {takeUntil} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {marker} from '../../../shared/interface/marker';


@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnDestroy {
  public zoom: number = 15;
  public lat: number = 47.23629625;
  public lng: number = 39.71261501;
  public selectAd: string = '';
  public markers: marker[] = [];
  public role: any;
  public images: Array<any> = [ {fileToUpload: null} ];
  public form: FormGroup;

  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.api.getUser(this.api.getUserId())
      .pipe(takeUntil(this.destroy$))
      .subscribe(role => this.role = role);
    this.initForm();
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      user: ['', []],
      nameNews: ['', []],
      vacancy: ['', []],
      workTime: ['', []],
      experience: ['', []],
      content: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', []],
      coordinate: ['', []],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onFileChange(image, files: FileList): void {
    image.fileToUpload = files.item(0);
  }

  public saveVacancy(): void {
    const user = Object.assign({}, this.form.value);
    user.user = this.api.getUserId();
    user.nameNews = this.role.person.typeUser;
    user.coordinate = `${this.markers[0].lat}, ${this.markers[0].lng}`;
    this.api.setVacancy(user, this.images)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
          console.log(res);
        },
        error => console.log(error),
        ()=> {
          this.router.navigate(['/person']);
        });
  }

  public select(key: string): void {
   this.selectAd = key;
   this.form.reset();
  }

  public plusImage(): void {
    this.images.push({ fileToUpload: null});
  }

  public deleteImage(): void {
    this.images.pop();
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


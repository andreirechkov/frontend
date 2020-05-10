import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../shared/service/api.service';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {
  public zoom: number = 15;
  public lat: number = 47.23629625;
  public lng: number = 39.71261501;
  public selectAd: string = '';
  public fileToUpload: File = null;
  public images: Array<any> = [{
    image: ''
  }]

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', []],
      nameNews: ['', []],
      vacancy: ['', []],
      workTime: ['', []],
      experience: ['', []],
      content: ['', []],
      price: ['', []],
      category: ['', []],
      coordinate: ['', []],
      email: ['', []],
      phone: ['', []],
      image: ['', []]
    });
  }

  public onFileChange(files: FileList): void {
    this.fileToUpload = files.item(0);
  }

  public saveVacancy(): void {
    const user = Object.assign({}, this.form.value);
    user.user = this.api.getUserId();
    if (this.selectAd === 'Арт-команда') {
      user.nameNews = 'Арт-команда';
    } else if (this.selectAd === 'Сдача помещения') {
      user.nameNews = 'Аренда помещения';
    } else {
      user.nameNews = 'Соискатель';
    }
    user.coordinate = `${this.lat},${this.lng}`;
    this.api.setVacancy(user, this.fileToUpload)
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
    this.images.push({image: ''});
  }

  public deleteImage(): void {
    this.images.pop();
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
}


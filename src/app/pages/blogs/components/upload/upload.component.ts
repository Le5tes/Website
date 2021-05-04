import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(public service: ImageService) { }

  ngOnInit(): void {
  }

  fileChanged(event) {
    Array.from(event.target.files).forEach(file => {
      this.service.upload(file).subscribe((response) => {
      });
    });
  }
}

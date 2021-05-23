import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  files = {}

  constructor(public service: ImageService) { }

  ngOnInit(): void {
  }

  fileChanged(event) {
    Array.from(event.target.files).forEach((file: File) => {
      this.files[file.name] = 'pending';
      this.service.upload(file).subscribe((response) => {
        this.files[file.name] = 'success';
      });
    });
  }
}

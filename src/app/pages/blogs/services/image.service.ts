import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url;
  uploadUrl;

  constructor(public http: HttpClient) {
    this.url = environment.blogUrl + '/images';
    this.uploadUrl = this.url + '/uploadUrl';
  }

  upload(file) {
    return this.http.get(this.uploadUrl).pipe(mergeMap((res: {url: string})=> this.http.put(res.url, file)));
  }
}

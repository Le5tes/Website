import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  get isLightTheme () {
    return window.matchMedia("(prefers-color-scheme: light)").matches
  } 
}
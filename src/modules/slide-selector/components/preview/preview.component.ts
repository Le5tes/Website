import { Component, Input, OnInit } from "@angular/core";
import { NavigationService } from "src/app/services/navigation/navigation.service";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"],
  standalone: false
})
export class PreviewComponent implements OnInit {
  @Input() item;
  @Input() url;

  constructor(public navigationService: NavigationService) {}

  ngOnInit(): void {}

  onClick(): void {
    this.navigationService.goto(`${this.url}/${this.item.id}`)
  }
}

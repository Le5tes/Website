import { Component, Input, OnInit } from "@angular/core";
import { NavigationService } from "src/app/services/navigation/navigation.service";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"],
})
export class PreviewComponent implements OnInit {
  @Input() blog;

  constructor(public navigationService: NavigationService) {}

  ngOnInit(): void {}

  onClick(): void {
    this.navigationService.goto(`blogs/${this.blog.id}`)
  }
}

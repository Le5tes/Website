import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slide-selector',
  templateUrl: './slide-selector.component.html',
  styleUrls: ['./slide-selector.component.scss']
})
export class SlideSelectorComponent implements OnInit {
  @Input()
  public items;

  constructor() { }

  ngOnInit() {
  }
}

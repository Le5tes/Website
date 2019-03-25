import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slide-selector',
  templateUrl: './slide-selector.component.html',
  styleUrls: ['./slide-selector.component.scss']
})
export class SlideSelectorComponent implements OnInit {
  @Input()
  public items = [];

  private itemsPosition = 1;

  constructor() { }

  ngOnInit() {
  }

  private get currentItem() { return this.items[this.itemsPosition]; }
  private get previousItem() { return this.items[this.itemsPosition - 1]; }
  private get nextItem() { return this.items[this.itemsPosition + 1]; }
}

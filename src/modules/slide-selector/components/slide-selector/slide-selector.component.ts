import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slide-selector',
  templateUrl: './slide-selector.component.html',
  styleUrls: ['./slide-selector.component.scss'],
  standalone: false
})
export class SlideSelectorComponent implements OnInit {
  @Input()
  public items = [];
  @Input() url;

  private itemsPosition = 1;

  constructor() { }

  ngOnInit() {
  }

  public scrollForward() {
    this.itemsPosition = this.nextItemPosition;
  }

  public scrollBackward() {
    this.itemsPosition  = this.previousItemPosition;
  }

  public get currentItem() { return this.items[this.itemsPosition]; }
  public get previousItem() { return this.items[this.previousItemPosition]; }
  public get nextItem() { return this.items[this.nextItemPosition]; }

  private get previousItemPosition () { return this.itemsPosition === 0 ? this.items.length -1 : this.itemsPosition - 1; }
  private get nextItemPosition () { return this.itemsPosition + 1 === this.items.length ? 0 : this.itemsPosition + 1; }
}

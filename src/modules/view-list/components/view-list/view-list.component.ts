import { Component, Input } from '@angular/core';
import { ListItem } from '../list-item/list-item';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.scss',
  standalone: false
})
export class ViewListComponent {
  @Input()
  items: ListItem[]
}

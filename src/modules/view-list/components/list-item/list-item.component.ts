import { Component, Input } from '@angular/core';
import { ListItem } from './list-item';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  standalone: false
})
export class ListItemComponent {
  _reverse = false;

  @Input() item: ListItem;
  @Input() set reverse(value: string){
    this._reverse = value === '' || value === 'true'
  };


  constructor(public navigationService: NavigationService) {}

  onClick(): void {
    this.navigationService.goto(this.item.url)
  }
}

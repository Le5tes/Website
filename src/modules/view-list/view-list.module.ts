import { NgModule } from "@angular/core";
import { ViewListComponent } from "./components/view-list/view-list.component";
import { ListItemComponent } from "./components/list-item/list-item.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ViewListComponent, ListItemComponent],
  imports: [CommonModule],
  exports: [ViewListComponent, ListItemComponent]
})
export class ViewListModule { }
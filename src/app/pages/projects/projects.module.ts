import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './components/projects/projects.component';
import { SafePipeModule } from 'safe-pipe';
import { ProjectComponent } from './components/project/project.component';
import { ViewListModule } from 'src/modules/view-list/view-list.module';



@NgModule({
  declarations: [
    ProjectsComponent, ProjectComponent
  ],
  imports: [
    CommonModule,
    SafePipeModule,
    ViewListModule
  ]
})
export class ProjectsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './components/projects/projects.component';
import { SafePipeModule } from 'safe-pipe';
import { MK1ProjectComponent } from './components/mk1-project/mk1-project.component';
import { ViewListModule } from 'src/modules/view-list/view-list.module';
import { SudokuSolverComponent } from './components/sudoku-solver/sudoku-solver.component';
import { GravitySimulatorComponent } from './components/gravity-simulator/gravity-simulator.component';
import { MastersProjectComponent } from './components/masters-project/masters-project.component';
import { ImagePipeModule } from 'src/modules/image-pipe/image-pipe.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    ProjectsComponent, MK1ProjectComponent, MastersProjectComponent, SudokuSolverComponent, GravitySimulatorComponent
  ],
  imports: [
    CommonModule,
    SafePipeModule,
    ViewListModule,
    MarkdownModule.forRoot(),
    ImagePipeModule
  ]
})
export class ProjectsModule { }

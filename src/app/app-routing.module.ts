import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './pages/games/components/games/games.component';
import { LandingComponent } from './pages/landing/components/landing/landing.component';
import { AboutComponent } from './pages/about/components/about/about.component';
import { BlogsComponent } from './pages/blogs/components/blogs.component';
import { LoginComponent } from './pages/login/components/login/login.component';
import { ProjectsComponent } from './pages/projects/components/projects/projects.component';
import { BlogByIdComponent } from './pages/blogs/components/blog-by-id/blog-by-id.component';
import { MK1ProjectComponent } from './pages/projects/components/mk1-project/mk1-project.component';
import { SudokuSolverComponent } from './pages/projects/components/sudoku-solver/sudoku-solver.component';
import { GravitySimulatorComponent } from './pages/projects/components/gravity-simulator/gravity-simulator.component';
import { MastersProjectComponent } from './pages/projects/components/masters-project/masters-project.component';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'games', component: GamesComponent},
  {path: 'blog', component: BlogsComponent},
  {path: 'blogs/:blogId', component: BlogByIdComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/mk1-robot', component: MK1ProjectComponent},
  {path: 'projects/legged-robotics', component: MastersProjectComponent},
  {path: 'projects/sudoku-solver', component: SudokuSolverComponent},
  {path: 'projects/gravity-simulator', component: GravitySimulatorComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

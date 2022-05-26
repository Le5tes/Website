import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './pages/games/components/games/games.component';
import { LandingComponent } from './pages/landing/components/landing/landing.component';
import { AboutComponent } from './pages/about/components/about/about.component';
import { BlogsComponent } from './pages/blogs/components/blogs.component';
import { LoginComponent } from './pages/login/components/login/login.component';
import { ProjectsComponent } from './pages/projects/components/projects/projects.component';
import { BlogByIdComponent } from './pages/blogs/components/blog-by-id/blog-by-id.component';

export const routes: Routes = [
  {path: '', component: BlogsComponent},
  {path: 'games', component: GamesComponent},
  {path: 'blog', component: BlogsComponent},
  {path: 'blogs/:blogId', component: BlogByIdComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

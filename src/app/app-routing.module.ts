import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from '../pages/games/components/games/games.component';
import { LandingComponent } from '../pages/landing/components/landing/landing.component';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'games', component: GamesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

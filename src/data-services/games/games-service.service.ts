import { Injectable } from '@angular/core';
import { Game } from './games.model';

const CAT_IMAGE = 'https://www.cats.org.uk/uploads/branches/231/Kit/Boba_red_sofa_small.jpg';
@Injectable({
  providedIn: 'root'
})
export class GamesServiceService {
  private _games: Game[];
  
  constructor() {
    const game = new Game();
    game.largeThumbnail = CAT_IMAGE;
    this._games = [game, game, game, game, game]
  }

  get games(): Game[] {
    return this._games;
  }
}

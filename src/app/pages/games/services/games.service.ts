import { Injectable } from '@angular/core';
import { Game } from './games.model';

const CAT_IMAGE = 'https://www.cats.org.uk/uploads/branches/231/Kit/Boba_red_sofa_small.jpg';
const DUCKLING_IMAGE = 'https://www.warrenphotographic.co.uk/photography/cats/27940.jpg'
@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private _games: Game[];
  
  constructor() {
    const game = new Game();
    game.largeThumbnail = CAT_IMAGE;
    const game2 = new Game()
    game2.largeThumbnail = DUCKLING_IMAGE;
    this._games = [game, game, game, game, game2]
  }

  get games(): Game[] {
    return this._games;
  }
}

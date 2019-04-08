import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/data-services/games/games.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  

  constructor(public gamesService: GamesService) { }

  ngOnInit() {
  }

  public get games() { return this.gamesService.games}

}

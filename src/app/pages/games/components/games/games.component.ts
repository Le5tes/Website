import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  standalone: false
})
export class GamesComponent implements OnInit {
  browserGames = []

  constructor() { }

  ngOnInit() {
  }

}

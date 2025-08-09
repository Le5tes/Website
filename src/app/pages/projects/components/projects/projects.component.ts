import { Component, OnInit } from '@angular/core';
import { allProjects } from '../../projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: false
})
export class ProjectsComponent implements OnInit {

  allProjects = allProjects

  constructor() { }

  ngOnInit(): void {
  }

}

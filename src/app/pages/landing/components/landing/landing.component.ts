import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/pages/blogs/services/blogs.service';
import { GamesService } from 'src/app/pages/games/services/games.service';
import { mastersProject, robotJourneyProject } from './landing-projects';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: false
})
export class LandingComponent implements OnInit {

  blogs

  constructor(public gamesService: GamesService, public blogsService: BlogsService) { }

  ngOnInit() {
    this.blogsService.getBlogs().subscribe((blogs) => this.blogs = blogs.map((blog) => {
      blog.createdAt = new Date(blog.createdAt);
      return blog;
    }).sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime()));
  }

  projects = [robotJourneyProject, mastersProject]

  public get games() { return this.gamesService.games}

}

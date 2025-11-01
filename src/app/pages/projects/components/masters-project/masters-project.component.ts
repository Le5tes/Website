import { Component } from '@angular/core';
import {mastersBlogPost} from './masters-project-blog.js'

@Component({
  selector: 'app-masters-project',
  templateUrl: './masters-project.component.html',
  styleUrl: './masters-project.component.scss',
  standalone: false
})
export class MastersProjectComponent {
  mastersBlog = mastersBlogPost
}

import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-sudoku-solver',
  templateUrl: './sudoku-solver.component.html',
  styleUrl: './sudoku-solver.component.scss',
  standalone: false
})
export class SudokuSolverComponent {
 projects = environment.projects
}

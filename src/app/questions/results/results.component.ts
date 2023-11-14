import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Question } from '../question.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  standalone: true,
  imports: [MatCardModule, TitleCasePipe, NgIf, NgFor, MatButtonModule, NgClass]
})
export class ResultsComponent implements OnInit {
  @Input()
  topic: string | undefined;

  @Input()
  questions: Question[] | undefined;

  @Input()
  answers: string[] | undefined;

  correctAnswers: string[] = ['a', 'c', 'd'];
  correctAnswersNumber: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.correctAnswers.map((q, index) => {
      if (this.answers && q === this.answers[index]) this.correctAnswersNumber++;
    })
  }

  goToTopicChoice() {
    this.router.navigate(['/start']);
  }

}

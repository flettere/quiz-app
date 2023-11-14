import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Question } from '../question.model';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from '../questions.service';
import { Answer } from '../answer.model';

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
  answers: Answer[] | undefined;

  correctAnswers: Answer[] | undefined;
  correctAnswersNumber: number = 0;

  constructor(private router: Router,
              private _questionService: QuestionsService) { }

  ngOnInit(): void {
    this._questionService.getAnswersByTopic(this.topic).subscribe(res => {
      this.correctAnswers = res

      this.correctAnswers.map(q => {
        let answerPresent = this.answers?.find(a => a.questionId === q.questionId);
        if (this.answers && answerPresent && q.answer === answerPresent.answer) this.correctAnswersNumber++;
      })
    });
  }

  goToTopicChoice() {
    this.router.navigate(['/start']);
  }

  isCorrect(questionId: number, option: string): boolean {
    let correctAnswer = this.correctAnswers?.find(x => x.questionId === questionId);
    if (correctAnswer?.answer === option) {
      return true;
    }
    return false;
  }

  isError(questionId: number, option: string): boolean {
    let answerPresent = this.answers?.find(a => a.questionId === questionId);
    if (answerPresent && answerPresent.answer === option  && answerPresent.answer !== this.correctAnswers?.find(x => x.questionId === questionId)?.answer) {
      return true;
    }
    return false;
  }


}

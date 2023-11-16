import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Question } from '../question.model';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from '../questions.service';
import { Answer } from '../answer.model';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  standalone: true,
  imports: [MatCardModule, TitleCasePipe, NgIf, NgFor, MatButtonModule, NgClass, NgxSpinnerModule]
})
export class ResultsComponent implements OnInit, OnDestroy {
  private _answersSubscription: Subscription | undefined;
  
  @Input()
  topic: string | undefined;

  @Input()
  questions: Question[] | undefined;

  @Input()
  answers: Answer[] | undefined;

  @Input()
  timeSecondsSpent: number = 0;

  correctAnswers: Answer[] | undefined;
  correctAnswersNumber: number = 0;
  timeSpent: string | undefined;

  constructor(private router: Router,
              private _questionService: QuestionsService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    let minutes = Math.floor((this.timeSecondsSpent % 3600) / 60);
    this.timeSpent = `${minutes.toString().padStart(2, '0')}:${this.timeSecondsSpent < 60 ? this.timeSecondsSpent.toString().padStart(2, '0') : (this.timeSecondsSpent - minutes*60).toString().padStart(2, '0')}`; 

    this._answersSubscription = this._questionService.getAnswersByTopic(this.topic).subscribe(res => {
      this.correctAnswers = res

      this.correctAnswers.map(q => {
        let answerPresent = this.answers?.find(a => a.questionId === q.questionId);
        if (this.answers && answerPresent && q.answer === answerPresent.answer) this.correctAnswersNumber++;
      })
      this.spinner.hide();
    });
  }

  ngOnDestroy(): void {
    this._answersSubscription && this._answersSubscription.unsubscribe();
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

  isMissing(questionId: number): boolean {
    let answerPresent = this.answers?.find(a => a.questionId === questionId);
    if (answerPresent) return false;
    else return true;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from './question.model';
import { QuestionsService } from './questions.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { ResultsComponent } from "./results/results.component";
import { Answer } from './answer.model';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
    standalone: true,
    imports: [NgFor, 
              NgIf, 
              MatButtonModule, 
              MatButtonToggleModule, 
              TitleCasePipe, 
              NgClass, 
              MatProgressBarModule, 
              MatDividerModule, 
              MatCardModule, 
              ResultsComponent, 
              NgxSpinnerModule,
              MatIconModule]
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private _routeSubscription: Subscription | undefined;
  private _intervalSubscription: Subscription | undefined;
  private _questionsSubscription: Subscription | undefined;
  private _cronoSubscription: Subscription | undefined;
  questions: Question[] = [];
  topic: string | undefined;
  currentQuestion: number = 0;
  answers: Answer[] = [];
  counter: number = 60;
  quizCompleted: boolean = false;
  timeSecondsSpent: number = 0;
  
  constructor(private _questionService: QuestionsService,
              private route: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getQuestions();
    this.startCounter();
    this.startCrono();
  }

  ngOnDestroy(): void {
    this._routeSubscription && this._routeSubscription.unsubscribe();
    this._intervalSubscription && this._intervalSubscription.unsubscribe();
    this._questionsSubscription && this._questionsSubscription.unsubscribe();
  }

  getQuestions() {
    this.spinner.show();
    this._routeSubscription = this.route.params.subscribe(params => {
      this.topic = params['topic'];
      this._questionsSubscription = this._questionService.getQuestionsByTopic(this.topic).subscribe({
        next: (res) => {
          this.questions = res;
            this.spinner.hide();
        },
        error: () => {
          this.spinner.hide();
        }
      });
   });
  }

  chooseOption(option: string, questionId: number) {
    let answerExists = this.answers.find(x => x.questionId === questionId);
    if (answerExists) answerExists.answer = option;
    else this.answers.push({questionId: questionId, answer: option});
  }

  nextQuestion() {
    this.currentQuestion++;
    this.resetCounter();

    if (this.questions && this.currentQuestion === this.questions.length) {
      this.stopCrono();
      this.quizCompleted = true;
    }
  }

  startCounter() {
    this._intervalSubscription = interval(1000).subscribe(val => {
      if (this.counter > 0) this.counter--;
    });
  }

  stopCounter() {
    this._intervalSubscription && this._intervalSubscription.unsubscribe();
    // this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    //this.timeSecondsSpent += 60 - this.counter;
    this.counter = 60;
    this.startCounter();
  }

  isSelected(questionId: number, option: string): boolean {
    let answer = this.answers.find(x => x.questionId === questionId);
    if (answer && answer.answer === option) return true;
    return false;
  }

  answerOk(): boolean {
    return !!this.answers.find(x => x.questionId === this.questions[this.currentQuestion].id);
  }

  goHome() {
    this.dialog.open(DialogComponent);
  }

  startCrono() {
    this._cronoSubscription = interval(1000).subscribe(val => {
      this.timeSecondsSpent++;
    });
  }

  stopCrono() {
    this._cronoSubscription && this._cronoSubscription.unsubscribe();
  }
}

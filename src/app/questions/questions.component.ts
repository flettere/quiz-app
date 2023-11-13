import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from './question.model';
import { QuestionsService } from './questions.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatButtonToggleModule, TitleCasePipe, NgClass, MatProgressBarModule]
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private _routeSubscription: Subscription | undefined;
  private _intervalSubscription: Subscription | undefined;
  questions: Question[] | undefined;
  topic: string | undefined;
  currentQuestion: number = 0;
  answers: string[] = [];
  counter: number = 60;
  quizCompleted: boolean = false;
  
  constructor(private _questionService: QuestionsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getQuestions();
    this.startCounter();
  }

  ngOnDestroy(): void {
    this._routeSubscription && this._routeSubscription.unsubscribe();
    this._intervalSubscription && this._intervalSubscription.unsubscribe();
  }

  getQuestions() {
    this._routeSubscription = this.route.params.subscribe(params => {
      
      this.topic = params['topic'];

      this._questionService.getQuestionsByTopic(this.topic).subscribe(res => this.questions = res);


   });
  }

  chooseOption(event: any) {
    this.answers[this.currentQuestion] = event.value;
  }

  nextQuestion() {
    if(!this.answers[this.currentQuestion]) {
      this.answers[this.currentQuestion] = '';
    }

    this.currentQuestion++;
    this.resetCounter();

    if (this.questions && this.currentQuestion === this.questions.length) {
      console.log(this.answers)
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
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

}

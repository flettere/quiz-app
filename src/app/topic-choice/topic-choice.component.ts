import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Topic } from './topic.model';
import { TopicService } from './topic.service';
import { AsyncPipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs/internal/Subscription';
import { OnDestroy } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-topic-choice',
  templateUrl: './topic-choice.component.html',
  styleUrls: ['./topic-choice.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, MatButtonModule, MatIconModule, TitleCasePipe, NgClass, NgxSpinnerModule, MatTooltipModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopicChoiceComponent implements OnInit, OnDestroy {
  topics: Topic[] | undefined;
  topicChoosed: Topic | undefined;
  private _topicSubscription: Subscription | undefined;

  constructor(private _topicService: TopicService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this._topicSubscription = this._topicService.getAllTopics().subscribe(res => {
      this.topics = res;
      this.spinner.hide();
    });
  }

  ngOnDestroy(): void {
    this._topicSubscription && this._topicSubscription.unsubscribe();
  }

  choosedTopic(topic: Topic) {
    this.topicChoosed = topic;
  }

  startQuiz() {
    this.router.navigate(['/quiz', this.topicChoosed?.name]);
  }

}

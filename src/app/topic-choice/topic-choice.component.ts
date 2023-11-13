import { Component, OnInit } from '@angular/core';
import { Topic } from './topic.model';
import { TopicService } from './topic.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-choice',
  templateUrl: './topic-choice.component.html',
  styleUrls: ['./topic-choice.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, MatButtonModule, MatButtonToggleModule, MatIconModule, TitleCasePipe]
})
export class TopicChoiceComponent implements OnInit {
  topics: Observable<Topic[]> | undefined;
  topicChoosed: Topic | undefined;

  constructor(private _topicService: TopicService,
              private router: Router) { }

  ngOnInit(): void {
    this.topics = this._topicService.getAllTopics();
  }

  choosedTopic(event: any) {
    this.topicChoosed = event.value;
  }

  startQuiz() {
    this.router.navigate(['/quiz', this.topicChoosed?.name]);
  }

}

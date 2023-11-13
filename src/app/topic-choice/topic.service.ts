import { Injectable } from '@angular/core';
import { Topic } from './topic.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private _http: HttpClient) { }

  getAllTopics() {
    return this._http.get<Topic[]>('/assets/data/topics.json');
  }
}

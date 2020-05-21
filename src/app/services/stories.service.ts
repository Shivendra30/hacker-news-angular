import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  // storyIdsUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';

  constructor(private http: HttpClient) {}

  getStoryIds(storyIdsUrl) {
    return this.http.get(storyIdsUrl);
  }

  getStory(id) {
    return this.http.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
  }
}

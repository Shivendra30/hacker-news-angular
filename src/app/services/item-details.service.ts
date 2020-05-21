import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemDetailsService {
  constructor(private http: HttpClient) {}

  getItemDetails(item_id: number) {
    return this.http.get(
      `https://hacker-news.firebaseio.com/v0/item/${item_id}.json`
    );
  }

  async getComments(itemDetails, commentsMap) {
    if (itemDetails) {
      if (!itemDetails.kids) return;

      const promises = itemDetails.kids.map((commentId) =>
        this.http
          .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
          .toPromise()
      );

      let comments = await Promise.all(promises);
      commentsMap.set(itemDetails.id, comments);

      await this.asyncForEach(comments, async (comment, index) => {
        comment.children = new Map();
        await this.getComments(comment, comment.children);
      });

      return commentsMap;
    }
  }

  async asyncForEach(array: any[], callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

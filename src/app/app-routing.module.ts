import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryListComponent } from './story-list/story-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const routes: Routes = [
  {
    component: StoryListComponent,
    path: 'top',
    data: { url: 'https://hacker-news.firebaseio.com/v0/topstories.json' },
  },
  {
    component: StoryListComponent,
    path: 'new',
    data: { url: 'https://hacker-news.firebaseio.com/v0/newstories.json' },
  },
  {
    component: StoryListComponent,
    path: 'show',
    data: { url: 'https://hacker-news.firebaseio.com/v0/showstories.json' },
  },
  {
    component: StoryListComponent,
    path: 'ask',
    data: { url: 'https://hacker-news.firebaseio.com/v0/askstories.json' },
  },
  {
    component: StoryListComponent,
    path: 'jobs',
    data: { url: 'https://hacker-news.firebaseio.com/v0/jobstories.json' },
  },
  {
    component: ItemDetailsComponent,
    path: 'item/:item_id',
  },
  {
    path: '',
    redirectTo: '/top?page=1',
    pathMatch: 'full',
    data: { url: 'https://hacker-news.firebaseio.com/v0/topstories.json' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

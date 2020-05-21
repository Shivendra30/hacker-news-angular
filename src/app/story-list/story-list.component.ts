import {
  Component,
  OnInit,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer,
} from '@angular/core';
import { StoriesService } from '../services/stories.service';
import { Story } from '../models/Story';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],
})
export class StoryListComponent implements OnInit {
  loading: boolean = false;
  storyIds: number[] = [];
  stories: Story[] = [];
  page = 1;
  LIMIT = 15;
  PAGES = 0;
  from = 0;
  to = this.LIMIT;
  differ: KeyValueDiffer<string, any>;
  storyUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';

  constructor(
    private storiesService: StoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private differs: KeyValueDiffers
  ) {
    this.differ = this.differs.find({}).create();
  }

  ngOnInit(): void {
    this.fetchStoryIds();
    this.activatedRoute.data.subscribe((data) => {
      if (data.url) this.storyUrl = data.url;
      console.log('URL: ', this.storyUrl);
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['page']) this.page = parseInt(params['page']);
    });
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem((item) => {
        if (item.key === 'page') this.fetchStories();
      });
    }
  }

  fetchStoryIds() {
    console.log('fetching Ids...');
    this.loading = true;
    this.storiesService
      .getStoryIds(this.storyUrl)
      .subscribe((ids: number[]) => {
        this.storyIds = ids;
        this.fetchStories();
      });
  }

  fetchStories() {
    console.log('fetching Story...');
    this.stories = [];
    this.PAGES = Math.floor(this.storyIds.length / this.LIMIT) + 1;

    this.from = (this.page - 1) * this.LIMIT + 1;
    this.to = this.from + this.LIMIT;

    //Get story for each ID
    this.storyIds.slice(this.from, this.to).map((id) => {
      this.storiesService.getStory(id).subscribe(
        (res: Story) => this.stories.push(res),
        null,
        () => {
          if (
            this.stories.length ===
            this.storyIds.slice(this.from, this.to).length
          ) {
            this.loading = false;
            console.log('fetched');
          }
        }
      );
    });
  }

  changePage(factor: number) {
    //Factor canbe negatvie or positive
    const newPage = this.page + factor;

    if (newPage > 0 && newPage <= this.PAGES) this.page = newPage;
    // alert(this.page);
    // this.router.navigate(['/top']);

    // const url = this.router
    //   .createUrlTree([{ page: this.page }], { relativeTo: this.activatedRoute })
    //   .toString();
    const path = this.activatedRoute.snapshot.routeConfig.path;

    this.location.go(`/${path}?page=${this.page}`);
    // window.location.reload();
  }
}

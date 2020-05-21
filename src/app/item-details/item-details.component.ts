import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ItemDetailsService } from '../services/item-details.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  item_id: number = null;
  loading = false;
  itemDetails = null;
  commentTree = new Map();
  comments = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemDetailsService: ItemDetailsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has('item_id')) {
        this.item_id = parseInt(paramMap.get('item_id'));
        this.getItemDetails();
      }
    });
  }

  getItemDetails() {
    this.loading = true;
    this.itemDetailsService.getItemDetails(this.item_id).subscribe((data) => {
      this.itemDetails = data;
      this.getComments();
    });
  }

  async getComments() {
    const commentsMap = new Map();
    await this.itemDetailsService.getComments(this.itemDetails, commentsMap);
    console.log(commentsMap);
    this.commentTree = commentsMap;
  }

  calculateComments = (commentTree) => {
    if (!commentTree) return 0;
    commentTree.forEach((val, key, map) => {
      val.forEach((i) => {
        if (i.children.size === 0) this.comments++;
        else if (i.children) this.calculateComments(i.children);
      });
    });
    return this.comments;
  };
}

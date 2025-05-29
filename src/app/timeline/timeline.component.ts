import { Component, OnInit } from '@angular/core';
import { PostComponent } from './../post/post.component';
import { DataService } from './../data.service';
import { throttle } from 'throttle-debounce';

@Component({
  selector: 'app-timeline',
  imports: [PostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent implements OnInit {
  private position = 1;
  constructor(public dataService: DataService) {}

  get posts() {
    return this.dataService.posts;
  }

  get isPostsLoading() {
    return this.dataService.isLoadingPosts;
  }

  ngOnInit() {
    this.loadPosts();

    const main = document.querySelector('#fullpage');
    if (main)
      main.addEventListener('scrollend', (event) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio == 1) {
              const index = parseInt(entry.target.children[0].innerHTML);
              const length = this.posts.length;
              console.log(index);
              console.log(length);
              if (length - index == 5 && index > this.position) {
                console.log('loading');
                this.position = index;
                loadMore();
              }
            }
          });
        });

        const elements = document.querySelectorAll('.section');
        elements.forEach((e) => observer.observe(e));
        const loadMore = throttle(
          1000,
          () => {
            this.dataService.getPostsNextPage();
          },
          { noLeading: false, noTrailing: false }
        );
      });
  }

  loadPosts() {
    this.dataService.getPosts();
  }
}

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
  private scrollLogicInitiated = false;
  constructor(public dataService: DataService) {}

  get posts() {
    return this.dataService.posts;
  }

  get isPostsLoading() {
    return this.dataService.isLoadingPosts;
  }
  scrollLogic() {
    const main = document.querySelector('#fullpage');
    if (main) {
      const elements = document.querySelectorAll('.section');
      if (elements.length == 0) {
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && this.scrollLogicInitiated) {
            const index = parseInt(entry.target.children[0].innerHTML);
            const length = this.posts.length;
            console.log('here goes ' + index + ' out of ' + length);
            if (length - index == 5 && index > this.position) {
              this.position = index;
              loadMore();
              this.scrollLogicInitiated = false;
            }
          }
        });
      });
      elements.forEach((e) => observer.observe(e));
      this.scrollLogicInitiated = true;
    }
    const loadMore = throttle(
      1000,
      () => {
        this.dataService.getPostsNextPage();
      },
      { noLeading: false, noTrailing: false }
    );
  }
  ngOnInit() {
    this.loadPosts();

    const intervalID = setInterval(() => {
      if (!this.scrollLogicInitiated) this.scrollLogic();
    }, 500);
  }

  loadPosts() {
    this.dataService.getPosts();
  }
}

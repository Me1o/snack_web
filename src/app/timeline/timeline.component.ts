import { Component, OnInit } from '@angular/core';
import { PostComponent } from './../post/post.component';
import { DataService } from './../data.service';
import { throttle } from 'throttle-debounce';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '../tabs/tabs.component';
declare var gtag: any;
@Component({
  selector: 'app-timeline',
  imports: [PostComponent, LoaderComponent, CommonModule, TabsComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent implements OnInit {
  public isLoggedIn = true;
  public profile = { id: '', name: '', email: '' };
  public position = 1;
  public scrollPosition = 1;
  private scrollLogicInitiated = false;
  private observer = new IntersectionObserver((entries) =>
    this.scrollCallback(entries)
  );
  constructor(public dataService: DataService) {}

  get posts() {
    return this.dataService.posts;
  }

  get isPostsLoading() {
    return this.dataService.isLoadingPosts;
  }

  get total(): number {
    return this.dataService.totalPosts;
  }

  get IsDone(): boolean {
    const length = this.posts.length;
    return length == this.total;
  }

  analyticsHit() {
    gtag('event', 'page_view', {
      page_title: 'timeline-scroll',
    });
  }
  scrollCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && this.scrollLogicInitiated) {
        const index = parseInt(entry.target.children[0].innerHTML);
        const length = this.posts.length;
        console.log('here goes ' + index + ' out of ' + length);
        this.analyticsHit();
        this.scrollPosition = index;
        if (length - index < 7 && index > this.position && !this.IsDone) {
          this.position = index;
          this.loadMore();
        }
      }
    });
  }

  scrollLogic() {
    const main = document.querySelector('#fullpage');
    if (main) {
      const elements = document.querySelectorAll('.section');
      if (elements.length == 0) {
        return;
      }
      elements.forEach((e) => {
        this.observer.observe(e);
        e.setAttribute('observed', '1');
      });
      this.scrollLogicInitiated = true;
    }
  }

  loadMore = throttle(
    1000,
    () => {
      this.dataService.getPostsNextPage();
    },
    { noLeading: false, noTrailing: false }
  );

  reload() {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
    this.dataService.resetPosts();
    this.position = 1;
    this.scrollPosition = 1;
  }

  tabChanged() {
    this.dataService.resetPosts();
    this.position = 1;
    this.scrollPosition = 1;

    setTimeout(() => {
      const element = document.getElementsByClassName('newssection')[0];
      element.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }

  ngOnInit() {
    this.dataService.isUserLoggedIn.subscribe((v) => {
      this.isLoggedIn = v.isLoggedIn;
      this.reload();
    });
    this.dataService.profile.subscribe((v) => {
      this.profile = v;
    });
    this.dataService.isPrefsUpdatedSubject.subscribe((v) => {
      if (this.posts.length > 0) this.reload();
    });
    // this.loadPosts();

    const intervalID = setInterval(() => {
      if (!this.scrollLogicInitiated) this.scrollLogic();
    }, 500);

    const targetNode = document.getElementById('fullpage');
    const observer = new MutationObserver((mutationList) => {
      //observer hack
      const elements = document.querySelectorAll('.section');
      elements.forEach((e) => {
        const isObserved = e.getAttribute('observed');
        if (!isObserved) this.observer.observe(e);
      });
      //
    });
    if (targetNode)
      observer.observe(targetNode, {
        attributes: false,
        childList: true,
        subtree: true,
      });
  }

  loadPosts() {
    this.dataService.getPosts();
  }
}

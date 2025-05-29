import { Injectable } from '@angular/core';
import { Post } from './post/posts.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from './../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  //posts properties
  public posts: Post[] = [];
  public isLoadingPosts = false;
  public postsQuery = { page: 1 };
  //

  getPosts() {
    this.isLoadingPosts = true;
    this.http
      .get(this.makeUrl('posts/' + this.postsQuery.page))
      .subscribe((res: any) => {
        this.posts.push(...res.data);
        this.isLoadingPosts = false;
      });
  }
  getPostsNextPage() {
    this.postsQuery.page = this.postsQuery.page + 1;
    this.getPosts();
  }

  makeUrl(url: string) {
    return this.baseUrl + '/' + url;
  }
}

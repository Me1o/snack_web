import { Injectable, untracked } from '@angular/core';
import { Post } from './post/posts.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from './../enviroments/enviroment';
import { BehaviorSubject } from 'rxjs';

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
  public totalPosts = 10;
  //

  //user properties
  public isLoadingUser = false;
  public userQuery = { email: '', password: '', name: '' };
  public doesUserExist = false;

  doesUserExistSubject = new BehaviorSubject(2);
  currentDoesUserExistSubject = this.doesUserExistSubject.asObservable();

  isUserLoggedIn = new BehaviorSubject({
    isLoggedIn: this.token != '' ? true : false,
    token: this.token,
  });
  isUserLoggedInSubject = this.isUserLoggedIn.asObservable();

  profile = new BehaviorSubject(
    this.userProfile ? JSON.parse(this.userProfile) : ''
  );
  profileSubject = this.profile.asObservable();

  authErrors = new BehaviorSubject({
    isErrored: false,
    message: '',
  });
  authErrorsSubject = this.isUserLoggedIn.asObservable();
  //

  //prefs properties
  public isLoadingPrefs = false;
  public prefsQuery = {
    politics: [],
    sports: [],
    culture: [],
    economics: [],
    entertainment: [],
    science: [],
    business: [],
    technology: [],
    legal: [],
    general: [],
  };
  //

  resetPosts() {
    this.postsQuery.page = 1;
    this.posts = [];
    this.getPosts();
  }
  getPosts() {
    this.isLoadingPosts = true;
    this.http
      .get(
        this.makeUrl(
          (this.token != '' ? 'posts/' : 'posts/explore/') +
            this.postsQuery.page
        )
      )
      .subscribe((res: any) => {
        this.posts.push(...res.data);
        this.totalPosts = res.total;
        this.isLoadingPosts = false;
      });
  }
  getPostsNextPage() {
    this.postsQuery.page = this.postsQuery.page + 1;
    this.getPosts();
  }

  validateEmailExistence() {
    this.isLoadingUser = true;
    this.http
      .get(this.makeUrl('auth/validate_email/' + this.userQuery.email))
      .subscribe((res: any) => {
        this.doesUserExist = res;
        this.doesUserExistSubject.next(this.doesUserExist ? 1 : 0);
        this.isLoadingUser = false;
      });
  }

  getUser() {
    this.isLoadingUser = true;
    this.http.get(this.makeUrl('auth/user/')).subscribe((res: any) => {
      localStorage.setItem(
        'profile',
        JSON.stringify({ id: res.id, email: res.email, name: res.name })
      );
      this.profile.next(this.userProfile ? JSON.parse(this.userProfile) : '');
      this.isLoadingUser = false;
    });
  }

  login() {
    this.isLoadingUser = true;
    this.http
      .post(this.makeUrl('auth/login/'), {
        email: this.userQuery.email,
        password: this.userQuery.password,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.isUserLoggedIn.next({ isLoggedIn: true, token: res.token });
            this.getUser();
          }
          this.isLoadingUser = false;
        },
        (error: any) => {
          this.authErrors.next({
            isErrored: true,
            message: 'كلمة المرور غير صحيحة',
          });
          this.isLoadingUser = false;
        }
      );
  }

  register() {
    this.isLoadingUser = true;
    this.http
      .post(this.makeUrl('auth/register/'), {
        email: this.userQuery.email,
        password: this.userQuery.password,
        name: this.userQuery.name,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.isUserLoggedIn.next({ isLoggedIn: true, token: res.token });
          }
          this.isLoadingUser = false;
        },
        (error: any) => {
          this.authErrors.next({
            isErrored: true,
            message: 'بريد الكتروني غير صالح',
          });
          this.isLoadingUser = false;
        }
      );
  }

  updatePreferences() {
    this.isLoadingPrefs = true;
    this.http
      .post(this.makeUrl('preferences/update/'), this.prefsQuery)
      .subscribe(
        (res: any) => {
          this.isLoadingPrefs = false;
          this.postsQuery.page = 1;
          this.getPosts();
        },
        (error: any) => {
          this.isLoadingPrefs = false;
        }
      );
  }

  getPreferences() {
    this.isLoadingPrefs = true;
    this.http.get(this.makeUrl('preferences/')).subscribe(
      (res: any) => {
        this.prefsQuery.politics = JSON.parse(res.politics);
        this.prefsQuery.sports = JSON.parse(res.sports);
        this.prefsQuery.economics = JSON.parse(res.economics);
        this.prefsQuery.entertainment = JSON.parse(res.entertainment);
        this.prefsQuery.culture = JSON.parse(res.culture);
        this.prefsQuery.technology = JSON.parse(res.technology);
        this.prefsQuery.science = JSON.parse(res.science);
        this.prefsQuery.legal = JSON.parse(res.legal);
        this.prefsQuery.business = JSON.parse(res.business);
        this.prefsQuery.general = JSON.parse(res.general);

        this.isLoadingPrefs = false;
      },
      (error: any) => {
        this.isLoadingPrefs = false;
      }
    );
  }

  makeUrl(url: string) {
    return this.baseUrl + '/' + url;
  }

  logout() {
    this.isLoadingUser = true;
    localStorage.setItem('token', '');
    setTimeout(() => {
      this.isUserLoggedIn.next({ isLoggedIn: false, token: '' });
      this.isLoadingUser = false;
    }, 1000);
  }

  get token() {
    return localStorage.getItem('token');
  }

  get userProfile() {
    return localStorage.getItem('profile');
  }

  resetAuth() {
    this.userQuery.email = '';
    this.userQuery.name = '';
    this.userQuery.password = '';
    this.doesUserExist = false;
    this.doesUserExistSubject.next(2);
  }
}

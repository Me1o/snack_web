import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [LoaderComponent, FormsModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  @Output() closeClickedEvent = new EventEmitter<void>();
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public passwordConfirm: string = '';
  public step = 1;
  public error = '';
  constructor(public dataService: DataService) {}

  closeClickHandler() {
    //reset
    console.log('reset');
    this.step = 1;
    this.error = '';
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordConfirm = '';
    this.dataService.resetAuth();
    //
    this.closeClickedEvent.emit();
  }

  get isUserLoading() {
    return this.dataService.isLoadingUser;
  }

  get isUserAvailable() {
    return this.dataService.doesUserExist;
  }

  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  validateUserExistence() {
    const isValid = this.isValidEmail();
    if (!isValid) {
      this.error = 'بريد إلكتروني غير صالج';
      return;
    }
    this.error = '';
    this.dataService.userQuery.email = this.email;
    this.dataService.validateEmailExistence();
  }

  login() {
    this.dataService.userQuery.password = this.password;
    this.dataService.login();
  }

  register() {
    this.dataService.userQuery.name = this.name;
    this.dataService.userQuery.password = this.password;
    this.dataService.register();
  }
  get isRegisterValid() {
    return (
      this.password == this.passwordConfirm &&
      this.name.length > 1 &&
      this.password.length > 5
    );
  }

  ngOnInit() {
    this.dataService.currentDoesUserExistSubject.subscribe((v) => {
      if (v == 2) return;
      this.step = 2;
    });

    this.dataService.isUserLoggedIn.subscribe((v) => {
      if (v.isLoggedIn) {
        this.closeClickedEvent.emit();
      }
    });

    this.dataService.authErrors.subscribe((v) => {
      if (v.isErrored) {
        this.error = v.message;
      }
    });
  }
}

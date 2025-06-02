import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prefs',
  imports: [LoaderComponent, FormsModule, CommonModule],
  templateUrl: './prefs.component.html',
  styleUrl: './prefs.component.css',
})
export class PrefsComponent implements OnInit {
  @Output() closeClickedEvent = new EventEmitter<void>();

  constructor(public dataService: DataService) {}

  get isUserLoading() {
    return this.dataService.isLoadingUser;
  }

  closeClickHandler() {
    this.closeClickedEvent.emit();
  }

  logout() {
    this.dataService.logout();
  }

  ngOnInit() {
    this.dataService.isUserLoggedIn.subscribe((v) => {
      if (v.isLoggedIn == false) this.closeClickedEvent.emit();
    });
  }
}

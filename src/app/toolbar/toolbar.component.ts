import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  @Output() loginClickedEvent = new EventEmitter<void>();
  @Output() prefClickedEvent = new EventEmitter<void>();
  constructor(public dataService: DataService) {}
  public isLoggedIn = true;
  loginClickHandler() {
    this.loginClickedEvent.emit();
  }

  prefClickHandler() {
    this.prefClickedEvent.emit();
  }

  ngOnInit() {
    this.dataService.isUserLoggedIn.subscribe((v) => {
      this.isLoggedIn = v.isLoggedIn;
    });
  }
}

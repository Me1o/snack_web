import { Component } from '@angular/core';
import { DateFnsModule } from 'ngx-date-fns';
import { AngularDraggableModule } from 'angular2-draggable';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AccountComponent } from './account/account.component';
import { PrefsComponent } from './prefs/prefs.component';
@Component({
  selector: 'app-root',
  imports: [
    DateFnsModule,
    AngularDraggableModule,
    CommonModule,
    TimelineComponent,
    ToolbarComponent,
    AccountComponent,
    PrefsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'snackWeb';

  constructor() {}

  public showAccount = false;
  public showPref = false;

  public loginClicked(event: any) {
    this.showAccount = true;
  }

  public prefClicked(event: any) {
    this.showPref = true;
  }

  public accountPanelCloseClicked(event: any) {
    this.showAccount = false;
  }

  public prefPanelCloseClicked(event: any) {
    this.showPref = false;
  }
}
function gtag(arg0: string, arg1: string, arg2: { page_path: string }) {
  throw new Error('Function not implemented.');
}

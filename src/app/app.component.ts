import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateFnsModule } from 'ngx-date-fns';
import { AngularDraggableModule } from 'angular2-draggable';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DateFnsModule,
    AngularDraggableModule,
    CommonModule,
    TimelineComponent,
    ToolbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'snackWeb';
}

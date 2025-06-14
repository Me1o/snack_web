import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { postCategory } from '../post/posts.entity';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent implements OnInit {
  public tab: postCategory | undefined = undefined;
  @Output() tabClickedEvent = new EventEmitter<void>();

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.tab = this.dataService.postsQuery.category as postCategory;
  }

  public get categories() {
    return postCategory;
  }

  setTab(category: postCategory | undefined) {
    this.tab = category;
    this.dataService.postsQuery.category = category ? category.toString() : '';
    this.tabClickedEvent.emit();
  }
}

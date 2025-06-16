import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post } from '../post/posts.entity';
import { marked } from 'marked';

@Component({
  selector: 'app-analysis',
  imports: [FormsModule, CommonModule],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
})
export class AnalysisComponent implements OnInit {
  @Output() closeClickedEvent = new EventEmitter<void>();
  @Input() post: Post = new Post();

  constructor(public dataService: DataService) {}

  closeClickHandler() {
    this.closeClickedEvent.emit();
  }

  get isLoading() {
    return this.dataService.isLoadingAnalysis;
  }

  get analysis() {
    if (this.isLoading) return;
    let text = this.dataService.analysis.data;
    let parser = marked.parse(text);
    return parser;
  }

  ngOnInit() {
    this.dataService.postsQuery.analysisId = parseInt(this.post.id);
    this.dataService.analize();
  }
}

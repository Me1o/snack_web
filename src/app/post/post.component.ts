import { Component, Input, OnInit } from '@angular/core';
import { Post, postCategory } from './posts.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input() post: Post = new Post();
  public categories: Array<string> = [];
  public source = '';
  ngOnInit() {
    this.getCategory();
    this.getSource();
  }

  getSource() {
    switch (this.post.source) {
      case 'aawsat':
        this.source = 'الشرق الأوسط';
        break;
      case 'aljazeera':
        this.source = ' الجزيرة';
        break;
    }
  }

  getCategory() {
    this.categories = [];
    this.post.category.forEach((c) => {
      let cat = '';
      switch (c) {
        case postCategory.Economics:
          cat = 'اقتصاد';
          break;
        case postCategory.Culture:
          cat = 'ثقافة';
          break;
        case postCategory.General:
          cat = 'عام';
          break;
        case postCategory.Entertainment:
          cat = 'ترفيه';
          break;
        case postCategory.Legal:
          cat = 'قانون';
          break;
        case postCategory.Politics:
          cat = 'سياسة';
          break;
        case postCategory.Science:
          cat = 'علوم';
          break;
        case postCategory.Sports:
          cat = 'رياضة';
          break;
        case postCategory.Technology:
          cat = 'تكنولوجيا';
          break;
        case postCategory.Business:
          cat = 'اعمال';
          break;
        default:
      }
      this.categories.push(cat);
    });
  }
}

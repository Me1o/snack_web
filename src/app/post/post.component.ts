import { Component, Input, OnInit } from '@angular/core';
import { Post, postCategory } from './posts.entity';
import { CommonModule } from '@angular/common';
import * as isoCountries from 'i18n-iso-countries';
import ar from 'i18n-iso-countries/langs/ar.json';
import { AnalysisComponent } from './../analysis/analysis.component';
@Component({
  selector: 'app-post',
  imports: [CommonModule, AnalysisComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input() post: Post = new Post();
  public categories: Array<string> = [];
  public countries: Array<string> = [];
  public source = '';
  public showAnalysis = false;
  ngOnInit() {
    this.getCategory();
    this.getSource();
    this.getCountry();
  }

  getSource() {
    switch (this.post.source) {
      case 'aawsat':
        this.source = 'الشرق الأوسط';
        break;
      case 'aljazeera':
        this.source = ' الجزيرة';
        break;
      case 'france24':
        this.source = ' فرانس ٢٤';
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

  getCountry() {
    isoCountries.registerLocale(ar);
    let cs = this.post.country.split(',');
    cs.forEach((c) => {
      let country = isoCountries.getName(c.trim(), 'ar');
      if (country) this.countries.push(country);
    });
  }

  public analysisPanelCloseClicked(event: any) {
    this.showAnalysis = false;
  }

  public analize() {
    this.showAnalysis = true;
  }
}

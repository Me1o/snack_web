import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as countries from './countries.json';

@Component({
  selector: 'app-countrySelector',
  imports: [FormsModule, CommonModule],
  templateUrl: './countrySelector.component.html',
  styleUrl: './countrySelector.component.css',
})
export class CountrySelectorComponent implements OnInit {
  @Output() closeClickedEvent = new EventEmitter<void>();
  @Output() okClickedEvent = new EventEmitter<any>();
  @Input() topic: string = '';
  @Input() inputCountries = new Array<string>();

  public countryData = countries;
  public countryList = new Array<{ name: string; code: string }>();
  public selectedCountries = new Array<{ name: string; code: string }>();

  constructor() {}

  closeClickHandler() {
    this.closeClickedEvent.emit();
  }

  okClickHandler() {
    this.okClickedEvent.emit(this.selectedCountries.map((c) => c.code));
  }

  ngOnInit() {
    for (const key in this.countryData) {
      if (key != 'default')
        this.countryList.push({
          name: key,
          code: (this.countryData as any)[key] as string,
        });
    }

    //pre selected countries
    this.inputCountries.forEach((cc: string) => {
      const countryObj = this.countryList.find((c) => c.code == cc);
      if (countryObj) this.selectedCountries.push(countryObj);
    });
  }

  isCountrySelected(code: string) {
    return this.selectedCountries.find((c) => c.code == code) != undefined;
  }
  toggleCountrySelection(country: any) {
    if (this.isCountrySelected(country.code))
      this.selectedCountries = this.selectedCountries.filter(
        (c) => c.code != country.code
      );
    else this.selectedCountries.push(country);
  }
  onCountrySelect(event: any) {
    console.log(event);
  }
}

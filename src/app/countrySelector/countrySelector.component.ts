import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as countries from './countries.json';
import * as isoCountries from 'i18n-iso-countries';
import { getContinentCode } from '@brixtol/country-continent';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

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
  public countryList = new Array<{
    name: string;
    code: string;
    code2: string;
    continant: string;
  }>();
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
      if (key != 'default') {
        const code2 = isoCountries.alpha3ToAlpha2(
          (this.countryData as any)[key] as string
        );
        const continent = getContinentCode(code2);
        this.countryList.push({
          name: key,
          code: (this.countryData as any)[key] as string,
          code2: code2 ? code2 : '',
          continant: continent ? continent : '',
        });
      }
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
  toggleSelectAll() {
    this.isAllSelected
      ? (this.selectedCountries = [])
      : (this.selectedCountries = this.countryList);
  }
  get isAllSelected() {
    return this.selectedCountries == this.countryList;
  }

  toggleSelectContinant(code: string) {
    const continantCountries = this.countryList.filter(
      (c) => c.continant == code
    );
    if (this.isAllSelectedInContinent(code)) {
      continantCountries.forEach((cc) => {
        if (this.isCountrySelected(cc.code)) this.toggleCountrySelection(cc);
      });
    } else {
      continantCountries.forEach((cc) => {
        if (!this.isCountrySelected(cc.code)) this.toggleCountrySelection(cc);
      });
    }
  }

  isAllSelectedInContinent(code: string) {
    const continantCountries = this.countryList.filter(
      (c) => c.continant == code
    );
    return continantCountries.every((cc) => {
      return this.selectedCountries.indexOf(cc) != -1;
    });
  }

  getFlag(code: string) {
    return getUnicodeFlagIcon(code);
  }
}

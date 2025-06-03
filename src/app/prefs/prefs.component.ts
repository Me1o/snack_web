import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountrySelectorComponent } from '../countrySelector/countrySelector.component';

@Component({
  selector: 'app-prefs',
  imports: [
    LoaderComponent,
    FormsModule,
    CommonModule,
    CountrySelectorComponent,
  ],
  templateUrl: './prefs.component.html',
  styleUrl: './prefs.component.css',
})
export class PrefsComponent implements OnInit {
  @Output() closeClickedEvent = new EventEmitter<void>();

  public showPoliticsPrefs = false;
  public showSportsPrefs = false;
  public showCulturePrefs = false;
  public showEconomicsPrefs = false;
  public showEntertainmentPrefs = false;
  public showSciencePrefs = false;
  public showBusinessPrefs = false;
  public showTechnologyPrefs = false;
  public showLegalPrefs = false;
  public showGeneralPrefs = false;

  constructor(public dataService: DataService) {}

  get politicsCountries() {
    return this.dataService.prefsQuery.politics;
  }
  get sportsCountries() {
    return this.dataService.prefsQuery.sports;
  }
  get cultureCountries() {
    return this.dataService.prefsQuery.culture;
  }
  get economicsCountries() {
    return this.dataService.prefsQuery.economics;
  }
  get scienceCountries() {
    return this.dataService.prefsQuery.science;
  }
  get businessCountries() {
    return this.dataService.prefsQuery.business;
  }
  get technologyCountries() {
    return this.dataService.prefsQuery.technology;
  }
  get legalCountries() {
    return this.dataService.prefsQuery.legal;
  }
  get generalCountries() {
    return this.dataService.prefsQuery.general;
  }
  get entertainmentCountries() {
    return this.dataService.prefsQuery.entertainment;
  }

  get isUserLoading() {
    return this.dataService.isLoadingUser;
  }
  get isPrefsLoading() {
    return this.dataService.isLoadingPrefs;
  }

  closeClickHandler() {
    this.closeClickedEvent.emit();
  }

  logout() {
    this.dataService.logout();
  }

  public politicsCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.politics = event;
    this.showPoliticsPrefs = false;
    this.dataService.updatePreferences();
  }

  public sportsCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.sports = event;
    this.showSportsPrefs = false;
    this.dataService.updatePreferences();
  }

  public cultureCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.culture = event;
    this.showCulturePrefs = false;
    this.dataService.updatePreferences();
  }

  public economicsCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.economics = event;
    this.showEconomicsPrefs = false;
    this.dataService.updatePreferences();
  }

  public entertainmentCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.entertainment = event;
    this.showEntertainmentPrefs = false;
    this.dataService.updatePreferences();
  }

  public scienceCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.science = event;
    this.showSciencePrefs = false;
    this.dataService.updatePreferences();
  }

  public businessCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.business = event;
    this.showBusinessPrefs = false;
    this.dataService.updatePreferences();
  }

  public technologyCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.technology = event;
    this.showTechnologyPrefs = false;
    this.dataService.updatePreferences();
  }

  public legalCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.legal = event;
    this.showLegalPrefs = false;
    this.dataService.updatePreferences();
  }

  public generalCountriesSelectionChange(event: any) {
    this.dataService.prefsQuery.general = event;
    this.showGeneralPrefs = false;
    this.dataService.updatePreferences();
  }

  ngOnInit() {
    this.dataService.getPreferences();
    this.dataService.isUserLoggedIn.subscribe((v) => {
      if (v.isLoggedIn == false) this.closeClickedEvent.emit();
    });
  }
}

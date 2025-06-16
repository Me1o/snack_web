import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefsComponent } from './prefs.component';

describe('AccountComponent', () => {
  let component: PrefsComponent;
  let fixture: ComponentFixture<PrefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

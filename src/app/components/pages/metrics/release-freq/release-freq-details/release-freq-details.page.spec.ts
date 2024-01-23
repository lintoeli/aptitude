import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReleaseFreqDetailsPage } from './release-freq-details.page';

describe('ReleaseFreqDetailsPage', () => {
  let component: ReleaseFreqDetailsPage;
  let fixture: ComponentFixture<ReleaseFreqDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReleaseFreqDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

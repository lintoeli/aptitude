import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReleaseFreqPage } from './release-freq.page';

describe('ReleaseFreqPage', () => {
  let component: ReleaseFreqPage;
  let fixture: ComponentFixture<ReleaseFreqPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReleaseFreqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BugIssuesRateDetailsPage } from './bug-issues-rate-details.page';

describe('BugIssuesRateDetailsPage', () => {
  let component: BugIssuesRateDetailsPage;
  let fixture: ComponentFixture<BugIssuesRateDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BugIssuesRateDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

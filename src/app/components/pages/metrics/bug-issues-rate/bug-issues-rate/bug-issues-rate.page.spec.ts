import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BugIssuesRatePage } from './bug-issues-rate.page';

describe('BugIssuesRatePage', () => {
  let component: BugIssuesRatePage;
  let fixture: ComponentFixture<BugIssuesRatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BugIssuesRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

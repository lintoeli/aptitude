import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadTimeDetailsPage } from './lead-time-details.page';

describe('LeadTimeDetailsPage', () => {
  let component: LeadTimeDetailsPage;
  let fixture: ComponentFixture<LeadTimeDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeadTimeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

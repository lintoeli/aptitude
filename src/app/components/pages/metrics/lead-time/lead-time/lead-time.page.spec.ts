import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadTimePage } from './lead-time.page';

describe('LeadTimePage', () => {
  let component: LeadTimePage;
  let fixture: ComponentFixture<LeadTimePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeadTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

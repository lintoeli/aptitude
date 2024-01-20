import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeRepairDetailsPage } from './time-repair-details.page';

describe('TimeRepairDetailsPage', () => {
  let component: TimeRepairDetailsPage;
  let fixture: ComponentFixture<TimeRepairDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TimeRepairDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

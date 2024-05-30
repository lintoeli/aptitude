import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeRepairPage } from './time-repair.page';

describe('TimeRepairPage', () => {
  let component: TimeRepairPage;
  let fixture: ComponentFixture<TimeRepairPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TimeRepairPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

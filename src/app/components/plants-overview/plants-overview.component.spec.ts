import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsOverviewComponent } from './plants-overview.component';

describe('PlantsOverviewComponent', () => {
  let component: PlantsOverviewComponent;
  let fixture: ComponentFixture<PlantsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalckPayComponent } from './calck-pay.component';

describe('CalckPayComponent', () => {
  let component: CalckPayComponent;
  let fixture: ComponentFixture<CalckPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalckPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalckPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

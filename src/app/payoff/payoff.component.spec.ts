import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoffComponent } from './payoff.component';

describe('PayoffComponent', () => {
  let component: PayoffComponent;
  let fixture: ComponentFixture<PayoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

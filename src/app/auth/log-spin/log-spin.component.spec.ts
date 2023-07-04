import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSpinComponent } from './log-spin.component';

describe('LogSpinComponent', () => {
  let component: LogSpinComponent;
  let fixture: ComponentFixture<LogSpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogSpinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

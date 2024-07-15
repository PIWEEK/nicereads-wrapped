import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrappedComponent } from './wrapped.component';

describe('WrappedComponent', () => {
  let component: WrappedComponent;
  let fixture: ComponentFixture<WrappedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrappedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrappedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

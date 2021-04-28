import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainingComponent } from './entertaining.component';

describe('EntertainingComponent', () => {
  let component: EntertainingComponent;
  let fixture: ComponentFixture<EntertainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntertainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprofileComponent } from './supprofile.component';

describe('SupprofileComponent', () => {
  let component: SupprofileComponent;
  let fixture: ComponentFixture<SupprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

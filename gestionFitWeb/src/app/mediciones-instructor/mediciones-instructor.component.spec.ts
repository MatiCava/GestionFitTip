import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicionesInstructorComponent } from './mediciones-instructor.component';

describe('MedicionesInstructorComponent', () => {
  let component: MedicionesInstructorComponent;
  let fixture: ComponentFixture<MedicionesInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicionesInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicionesInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

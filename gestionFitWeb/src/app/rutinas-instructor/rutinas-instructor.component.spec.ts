import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinasInstructorComponent } from './rutinas-instructor.component';

describe('RutinasInstructorComponent', () => {
  let component: RutinasInstructorComponent;
  let fixture: ComponentFixture<RutinasInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinasInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinasInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

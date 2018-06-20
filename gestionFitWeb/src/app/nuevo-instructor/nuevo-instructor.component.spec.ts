import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoInstructorComponent } from './nuevo-instructor.component';

describe('NuevoInstructorComponent', () => {
  let component: NuevoInstructorComponent;
  let fixture: ComponentFixture<NuevoInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClasesInstructorComponent } from './agregar-clases-instructor.component';

describe('AgregarClasesInstructorComponent', () => {
  let component: AgregarClasesInstructorComponent;
  let fixture: ComponentFixture<AgregarClasesInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarClasesInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarClasesInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

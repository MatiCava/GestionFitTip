import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEjercicioAsignarComponent } from './nuevo-ejercicio-asignar.component';

describe('NuevoEjercicioAsignarComponent', () => {
  let component: NuevoEjercicioAsignarComponent;
  let fixture: ComponentFixture<NuevoEjercicioAsignarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoEjercicioAsignarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEjercicioAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

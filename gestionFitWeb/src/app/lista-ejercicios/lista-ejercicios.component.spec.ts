import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEjerciciosComponent } from './lista-ejercicios.component';

describe('ListaEjerciciosComponent', () => {
  let component: ListaEjerciciosComponent;
  let fixture: ComponentFixture<ListaEjerciciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEjerciciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

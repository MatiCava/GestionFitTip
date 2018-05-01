import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRutinasComponent } from './lista-rutinas.component';

describe('ListaRutinasComponent', () => {
  let component: ListaRutinasComponent;
  let fixture: ComponentFixture<ListaRutinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRutinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

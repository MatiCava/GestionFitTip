import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaMedicionComponent } from './nueva-medicion.component';

describe('NuevaMedicionComponent', () => {
  let component: NuevaMedicionComponent;
  let fixture: ComponentFixture<NuevaMedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaMedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaMedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

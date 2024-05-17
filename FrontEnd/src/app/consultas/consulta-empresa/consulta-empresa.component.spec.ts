import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEmpresaComponent } from './consulta-empresa.component';

describe('ConsultaEmpresaComponent', () => {
  let component: ConsultaEmpresaComponent;
  let fixture: ComponentFixture<ConsultaEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaEmpresaComponent]
    });
    fixture = TestBed.createComponent(ConsultaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

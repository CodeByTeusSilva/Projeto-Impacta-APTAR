import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AberturaDeChamadoEmpresaComponent } from './abertura-de-chamado-empresa.component';

describe('AberturaDeChamadoEmpresaComponent', () => {
  let component: AberturaDeChamadoEmpresaComponent;
  let fixture: ComponentFixture<AberturaDeChamadoEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AberturaDeChamadoEmpresaComponent]
    });
    fixture = TestBed.createComponent(AberturaDeChamadoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
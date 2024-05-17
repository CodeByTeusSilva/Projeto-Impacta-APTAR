import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeEntregaTecnicosComponent } from './formulario-de-entrega-tecnicos.component';

describe('FormularioDeEntregaTecnicosComponent', () => {
  let component: FormularioDeEntregaTecnicosComponent;
  let fixture: ComponentFixture<FormularioDeEntregaTecnicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioDeEntregaTecnicosComponent]
    });
    fixture = TestBed.createComponent(FormularioDeEntregaTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

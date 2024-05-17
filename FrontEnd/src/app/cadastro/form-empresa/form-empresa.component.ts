import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { CadastroService } from "../../services/cadastro.service";
import { EmpresaDTOinput } from "../../models/empresa-dtoinput";
import { AuthService } from 'src/app/login/auth.service';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, empty, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent {

  form: FormGroup;
  usuario: any;
  isEditMode: boolean = false;
  empresaEncontrada?: EmpresaDTOinput;
  idEmpresa?: any;


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: CadastroService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      cnpj: [null, [Validators.required, this.validarCNPJ.bind(this)]],
      telefone: [null, Validators.required],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, CadastroService.cepValidator]],
        logradouro: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      confirmarSenha: [null, [Validators.required, this.equalsTo('senha')]]
    });

    this.form.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap((value: any) => console.log('status CEP:', value)),
        switchMap((status: any) => status === 'VALID' ?
          this.service.consultaCEP(this.form.get('endereco.cep')?.value)
          : empty()
        )
      )
      .subscribe((dados: any) => dados ? this.populaDadosform(dados) : {});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params)
      this.usuario = params['tipoUsuario'];
      
      if (this.usuario) {
        this.isEditMode = true;
        this.preencherFormulario();

      }
    });
  }

  preencherFormulario() {
    this.empresaEncontrada = this.authService.getEmpresaEncontrada();
    if (this.empresaEncontrada && this.empresaEncontrada.endereco) {
      this.form.patchValue({
        nome: this.empresaEncontrada.nome,
        cnpj: this.empresaEncontrada.cnpj,
        telefone: this.empresaEncontrada.telefone,
        endereco: {
          cep: this.empresaEncontrada.endereco.cep,
          logradouro: this.empresaEncontrada.endereco.logradouro,
          numero: this.empresaEncontrada.endereco.numero,
          complemento: this.empresaEncontrada.endereco.complemento,
          bairro: this.empresaEncontrada.endereco.bairro,
          cidade: this.empresaEncontrada.endereco.cidade,
          estado: this.empresaEncontrada.endereco.estado
        },
        email: this.empresaEncontrada.email,
        senha: this.empresaEncontrada.senha, 
      });
    }
  }
  
  

  onSubmitEmp() {
    console.log(this.form);
    const empresaData: EmpresaDTOinput = this.form.value;
    this.service.saveEmp(empresaData).subscribe(
      response => {
        console.log('Empresa salva com sucesso!', response);
      },
      error => {
        console.error('Erro ao salvar empresa', error);
      }
    );
  }

  consultaCEP() {
    const cep = this.form.get('endereco.cep')?.value;
    console.log(cep);
    if (cep != null && !cep.isEmpty) {
      this.service.consultaCEP(cep)?.subscribe((dados: any) => {
        this.populaDadosform(dados);
      });
    }
  }

  populaDadosform(dados: any) {
    console.log(dados);
    this.form.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  validarCNPJ(control: AbstractControl): ValidationErrors | null {
    const cnpjValue = control.value;
    if (cnpjValue == null) {
      return null;
    }
    const cnpjValido = this.service.validarCNPJ(cnpjValue);
    return cnpjValido ? null : { 'cnpjInvalido': true };
  }

  equalsTo(otherField: string): ValidatorFn {
    return (formControl: AbstractControl) => {
      const field = formControl.root.get(otherField) as AbstractControl;
      if (field && field.value !== formControl.value) {
        return { equalsTo: true };
      }
      return null;
    }
  }

  onUpdateEmp() {
    this.empresaEncontrada = this.authService.getEmpresaEncontrada();
    if (this.empresaEncontrada) {
      this.idEmpresa = this.empresaEncontrada.id;
      if (this.form.valid && this.idEmpresa) {
        this.empresaEncontrada.nome = this.form.get('nome')?.value;
        this.empresaEncontrada.cnpj = this.form.get('cnpj')?.value;
        this.empresaEncontrada.telefone = this.form.get('telefone')?.value;
        this.empresaEncontrada.endereco.cep = this.form.get('endereco.cep')?.value;
        this.empresaEncontrada.endereco.logradouro = this.form.get('endereco.logradouro')?.value;
        this.empresaEncontrada.endereco.numero = this.form.get('endereco.numero')?.value;
        this.empresaEncontrada.endereco.complemento = this.form.get('endereco.complemento')?.value;
        this.empresaEncontrada.endereco.bairro = this.form.get('endereco.bairro')?.value;
        this.empresaEncontrada.endereco.cidade = this.form.get('endereco.cidade')?.value;
        this.empresaEncontrada.endereco.estado = this.form.get('endereco.estado')?.value;
        this.empresaEncontrada.email = this.form.get('email')?.value;
        this.empresaEncontrada.senha = this.form.get('senha')?.value;
  
        this.service.updateEmp(this.idEmpresa, this.empresaEncontrada).subscribe(
          response => {
            console.log('Empresa atualizada com sucesso!', response);
            // Adicione aqui qualquer lógica adicional após a atualização bem-sucedida
          },
          error => {
            console.error('Erro ao atualizar empresa:', error);
            // Adicione aqui qualquer lógica para lidar com erros durante a atualização
          }
        );
      }
    } else {
      console.error('Nenhuma empresa encontrada para atualizar.');
      // Adicione lógica para lidar com a ausência de empresa encontrada
    }
  }

}

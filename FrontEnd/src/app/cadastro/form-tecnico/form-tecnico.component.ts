import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {CadastroService} from "../../services/cadastro.service";
import {TecnicoDtoinput} from "../../models/tecnico-dtoinput";
import {distinctUntilChanged, empty, switchMap, tap} from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-form-tecnico',
  templateUrl: './form-tecnico.component.html',
  styleUrls: ['./form-tecnico.component.css']
})
export class FormTecnicoComponent {

  form: FormGroup;
  usuario: any;
  isEditMode: boolean = false;
  tecnicoEncontrado?:TecnicoDtoinput;
  idTecnico?: any;


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: CadastroService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null, [Validators.required, this.validarCPF.bind(this)]],
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
    this.tecnicoEncontrado = this.authService.getTecnicoEncontrado();
    if (this.tecnicoEncontrado && this.tecnicoEncontrado.endereco) {
      this.form.patchValue({
        nome: this.tecnicoEncontrado.nome,
        cpf: this.tecnicoEncontrado.cpf,
        telefone: this.tecnicoEncontrado.telefone,
        endereco: {
          cep: this.tecnicoEncontrado.endereco.cep,
          logradouro: this.tecnicoEncontrado.endereco.logradouro,
          numero: this.tecnicoEncontrado.endereco.numero,
          complemento: this.tecnicoEncontrado.endereco.complemento,
          bairro: this.tecnicoEncontrado.endereco.bairro,
          cidade: this.tecnicoEncontrado.endereco.cidade,
          estado: this.tecnicoEncontrado.endereco.estado
        },
        email: this.tecnicoEncontrado.email,
        senha: this.tecnicoEncontrado.senha, 
      });
    }
  }
  
  
  

  onSubmitTec() {
    console.log(this.form)
    const tecnicoData: TecnicoDtoinput = this.form.value;
    this.service.saveTec(tecnicoData).subscribe(
      response => {
        console.log('Técnico salvo com sucesso!', response);
      },
      error => {
        console.error('Erro ao salvar técnico:', error);
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
    console.log(dados)
    this.form.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  validarCPF(control: AbstractControl): ValidationErrors | null {
    const  cpf = control.value;
    if (cpf == null) {
      return null;
    }
    const cpfValido = this.service.validarCPF(cpf);
    return cpfValido ? null : { 'cpfInvalid': true };
  }

  equalsTo(otherField: string): ValidatorFn {
    return (formControl: AbstractControl) => {
      const field = formControl.root.get(otherField) as AbstractControl;
      if (field && field.value !== formControl.value) {
        return {equalsTo: true};
      }
      return null;
    };

  }
  
  onUpdateTec() {
    this.tecnicoEncontrado = this.authService.getTecnicoEncontrado();
    if (this.tecnicoEncontrado) {
      this.idTecnico = this.tecnicoEncontrado.id;
      if (this.form.valid && this.idTecnico) {
        this.tecnicoEncontrado.nome = this.form.get('nome')?.value;
        this.tecnicoEncontrado.cpf = this.form.get('cpf')?.value;
        this.tecnicoEncontrado.telefone = this.form.get('telefone')?.value;
        this.tecnicoEncontrado.endereco.cep = this.form.get('endereco.cep')?.value;
        this.tecnicoEncontrado.endereco.logradouro = this.form.get('endereco.logradouro')?.value;
        this.tecnicoEncontrado.endereco.numero = this.form.get('endereco.numero')?.value;
        this.tecnicoEncontrado.endereco.complemento = this.form.get('endereco.complemento')?.value;
        this.tecnicoEncontrado.endereco.bairro = this.form.get('endereco.bairro')?.value;
        this.tecnicoEncontrado.endereco.cidade = this.form.get('endereco.cidade')?.value;
        this.tecnicoEncontrado.endereco.estado = this.form.get('endereco.estado')?.value;
        this.tecnicoEncontrado.email = this.form.get('email')?.value;
        this.tecnicoEncontrado.senha = this.form.get('senha')?.value;
        
  
        this.service.updateTec(this.idTecnico, this.tecnicoEncontrado).subscribe(
          response => {
            console.log('Técnico atualizado com sucesso!', response);
            // Adicione aqui qualquer lógica adicional após a atualização bem-sucedida
          },
          error => {
            console.error('Erro ao atualizar técnico:', error);
            // Adicione aqui qualquer lógica para lidar com erros durante a atualização
          }
        );
      } else {
        // Adicione lógica para lidar com formulário inválido, se necessário
      }
    } else {
      console.error('Nenhum técnico encontrado para atualizar.');
      // Adicione lógica para lidar com a ausência de técnico encontrado
    }
  }
  

 
}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, tap, switchMap, empty } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { Chamado } from 'src/app/models/chamado.model';
import { ChamadoService } from 'src/app/services/Chamado.service';



@Component({
  selector: 'app-abertura-de-chamado-empresa',
  templateUrl: './abertura-de-chamado-empresa.component.html',
  styleUrls: ['./abertura-de-chamado-empresa.component.css']
})
export class AberturaDeChamadoEmpresaComponent implements OnInit {

  form: FormGroup;
  usuario: any;
  empresaEncontrada?: Chamado;
  idEmpresa?: any;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: ChamadoService,
    private authService: AuthService

  ) {
    this.form = this.formBuilder.group({
      prioridade: [0],
      status: [null],
      titulo: [null],
      observacoes: [null],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, ChamadoService.cepValidator]],
        logradouro: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      tecnico: [null],
      empresa: [this.authService.empresaEncontrada.id],
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
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      this.usuario = params['tipoUsuario'];
      
      if (this.usuario) {
        this.preencherFormulario();

      }
    });
  }
  
  preencherFormulario() {
    this.empresaEncontrada = this.authService.getEmpresaEncontrada();
    if (this.empresaEncontrada && this.empresaEncontrada.endereco) {
      this.form.patchValue({
      prioridade: '',
      status:this.empresaEncontrada.status,
      titulo: this.empresaEncontrada.titulo,
      observacoes: this.empresaEncontrada.observacoes,
      endereco:{
        cep: this.empresaEncontrada.endereco.cep,
        logradouro: this.empresaEncontrada.endereco.logradouro,
        numero: this.empresaEncontrada.endereco.numero,
        complemento: this.empresaEncontrada.endereco.complemento,
        bairro: this.empresaEncontrada.endereco.bairro,
        cidade: this.empresaEncontrada.endereco.cidade,
        estado: this.empresaEncontrada.endereco.estado,
      },
      tecnico: this.authService.tecnicoEncontrado.id,
      empresa: this.authService.empresaEncontrada.id,
    });
  }
}
  submitForm() {
    console.log(this.form);
    const chamado: Chamado = this.form.value;
    this.service.savecham(chamado).subscribe(
      response => {
        console.log('Empresa salva com sucesso!', response);
      },
      error => {
        console.error('Erro ao salvar empresa', error);
      }
    );
  }

  consultaCEP() {
      const cep = this.form.get('endereco.cep')?.value
      
      if(cep != null && !cep.isEmpty) {
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
}

import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.page.html',
  styleUrls: ['./form-usuario.page.scss'],
})
export class FormUsuarioPage implements OnInit {
  usuario = {
    email : "",
    nombres : "",
    apellidos : "",
    genero : "",
    password : "",
    password_confirm : ""
  }

  errores = {
    email : "",
    nombres: "",
    apellidos: "",
    genero: "",
    password: "",
    password_confirm: ""
  }

  constructor(
    private restService : RestService,
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {}

  registrarUsuario () {
    let formulario = new FormData();
    formulario.append('email',this.usuario.email);
    formulario.append('nombres',this.usuario.nombres);
    formulario.append('apellidos',this.usuario.apellidos);
    formulario.append('genero',this.usuario.genero);
    formulario.append('password',this.usuario.password);

    if ( this.usuario.password != this.usuario.password_confirm ) {
      this.showToast('Passwords no coinciden');
    } 

    let regex = new RegExp('[\d{9}][@upsrj.edu.mx]{13}');
    let correo = regex.test(this.usuario.email);

    if (correo) {
      console.log('Correo Valido');
    } else {
      console.log('Correo no Valido');
    }

    let arroba = true;
    let email = [];

    for (var i = 0; i < this.usuario.email.length; i++) {
      email[i] = this.usuario.email.charAt(i);
      
      if (email[i] == '@') {
        arroba = false;
      }
    }
  
    if (arroba) {
      this.errores.email = "El correo no tiene arroba @";
    } else {
      let posArroba = 0;

      if (email[9] != '@') {
        for ( var i = 0; i < this.usuario.email.length; i++ ) {
          if ( email[i] == '@' ) {
            posArroba = i;
          }
        }

        if ( posArroba < 9 ) {
          this.errores.email = "La matrícula debe tener más caracteres";
        } else {
          this.errores.email = "La matricula debe tener menos caracteres";
        }

      } else {
        var letra = true;
        const pattern = new RegExp('[0-9]');

        for(var i = 0; i < 9; ++i) {
          var l = pattern.test(email[i]);

          if (!l) {
            letra = false;
            break;
          } 
        }

        if (letra) {
          let complemento = "";

          for ( var i = 10; ; ++i ) {
            if ( email[i] == null ) break;

            complemento += email[i];
          }

          if (complemento != "upsrj.edu.mx") {
            this.errores.email = "El correo debe tener una terminación upsrj.edu.mx";
          } else if (complemento == "upsrj.edu.mx")  { 
            this.restService.subida_ficheros_y_datos('usuarios/api/usuario', formulario).subscribe(result => {
              if(result.status == "0") {
                if (result.errores.email == 'The E-mail field must contain a unique value.') {
                  this.showToast('Este correo ya fue ingresado, por favor utiliza otro');
                } else if (result.errores.email != null) {
                  this.errores.email = "Por favor, ingresa el correo";
                } 
                
                if (result.errores.nombres != null) {
                  this.errores.nombres = "Por favor, ingresa los nombres";
                } 
                
                if (result.errores.apellidos != null) {
                  this.errores.apellidos = "Por favor, ingresa los apellidos";
                }  
                
                if (result.errores.genero != null) {
                  this.errores.genero = "Por favor, ingresa el genero";
                }  
                
                if (result.errores.password != null) {
                  this.errores.password = "Por favor, ingresa el password";
                }
      
                if (this.usuario.password_confirm == null) {
                  this.errores.password_confirm = "Por favor, repite el password";
                }
              } else {
                this.errores.email = null;
                this.showToast('Usuario registrado Correctamente');
              }
              this.router.navigate(['/login']);
            });
          }
        } else {
          this.errores.email= "La matrícula contiene letras";
        }
      }
    }
  }

  closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    }
    );
  }

  async showToast(msg) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}


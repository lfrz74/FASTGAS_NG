import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
// Autenticación en la plataforma
import { AuthService } from './auth.service';
// Autenticación en Google con firebase
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private platform: Platform
  ) {}


  ngOnInit() {
    console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('iOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.loguear(email, password).subscribe(resData => {
          console.log(resData);
          this.isLoading = false;
          loadingEl.dismiss();
          //  this.router.navigateByUrl('/places/tabs/discover');
        },
        erroRes => {
          loadingEl.dismiss();
          const msg = erroRes.error.message;
          this.mostrarAlerta(msg);
        });
        setTimeout(() => {
        }, 1500);
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  private mostrarAlerta(msg: string) {
    this.alertCtrl
      .create({
        header: 'Autenticación fallida..!',
        message: msg,
        buttons: ['Okay']})
        .then(alertEl => alertEl.present());
  }

  loginGoogle() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
    } else {
      this.loginGoogleWeb();
    }
  }

  async loginGoogleWeb() {
    const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log(user);
  }

  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({
      webClientId: environment.CLIENT_ID_ANDROID,
      offline: true
    });
    const resConfirmed = await this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
    const user = resConfirmed.user;
    console.log(user);
  }


 async loginFacebook() {
  const res = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  const user = res.user;
  console.log(user);
 }

}

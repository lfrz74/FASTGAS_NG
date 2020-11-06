import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
// Autenticación en la plataforma
import { AuthService } from '../services/auth.service';
// Autenticación en Google con firebase
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { auth } from 'firebase';
// Autenticación en Facebook con firebase
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LocalStorageService } from '../services/local-storage.service';
import { Auth } from '../models/auth';
import { CryptoService } from '../services/crypto.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  autorizacion: Auth = { email: '', refreshToken: '', uid: '', origen: ''};
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private fb: Facebook,
    private platform: Platform,
    private localStorageSrv: LocalStorageService,
    private cryptoSrv: CryptoService
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
          this.router.navigateByUrl('/usuario/tabs');
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

  onLogin() {

  }

  async loginGoogleWeb() {
    const author = this.localStorageSrv.getAuth();
    if (author.uid === '' && author.email === '' ) {
      const user = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

      this.autorizacion.email = user.user.email;
      this.autorizacion.refreshToken = this.cryptoSrv.convertText('encrypt', user.user.refreshToken);
      this.autorizacion.uid = this.cryptoSrv.convertText('encrypt', user.user.uid);
      this.autorizacion.origen = 'G';
      this.localStorageSrv.addAuth(this.autorizacion);
      this.authService.verificarToken(this.autorizacion.refreshToken, this.autorizacion.uid, this.autorizacion.email).subscribe(resData => {
        if (resData.token !== ''){
          this.localStorageSrv.addObject('currentoken', this.cryptoSrv.convertText('encrypt', resData.token));
        }
      });
    } else {
      await this.authService.verificarToken(author.refreshToken, author.uid, author.email).subscribe(resData => {
        if (resData.token !== ''){
          this.localStorageSrv.addObject('currentoken', this.cryptoSrv.convertText('encrypt', resData.token));
        }
      });
    }
  }

  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({
      webClientId: environment.CLIENT_ID_ANDROID,
      offline: true
    });
    const author = this.localStorageSrv.getAuth();
    if (author.uid === '' && author.email === '' ) {
      const user = await this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));

      this.autorizacion.email = user.user.email;
      this.autorizacion.refreshToken = this.cryptoSrv.convertText('encrypt', user.user.refreshToken);
      this.autorizacion.uid = this.cryptoSrv.convertText('encrypt', user.user.uid);
      this.autorizacion.origen = 'G';
      this.localStorageSrv.addAuth(this.autorizacion);
      this.authService.verificarToken(this.autorizacion.refreshToken, this.autorizacion.uid, this.autorizacion.email).subscribe(resData => {
        if (resData.token !== ''){
          this.localStorageSrv.addObject('currentoken', this.cryptoSrv.convertText('encrypt', resData.token));
        }
      });
    } else {
      await this.authService.verificarToken(author.refreshToken, author.uid, author.email).subscribe(resData => {
        if (resData.token !== ''){
          this.localStorageSrv.addObject('currentoken', this.cryptoSrv.convertText('encrypt', resData.token));
        }
      });
    }
  }

  async loginFacebook() {
    const author = this.localStorageSrv.getAuth();
    if (author.uid === '' && author.email === '' ) {
      const user = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());

      this.autorizacion.email = user.user.email;
      this.autorizacion.refreshToken = this.cryptoSrv.convertText('encrypt', user.user.refreshToken);
      this.autorizacion.uid = this.cryptoSrv.convertText('encrypt', user.user.uid);
      this.autorizacion.origen = 'F';
      this.localStorageSrv.addAuth(this.autorizacion);
      this.authService.verificarToken(this.autorizacion.refreshToken, this.autorizacion.uid, this.autorizacion.email).subscribe(resData => {
        if (resData.token !== ''){
          this.localStorageSrv.addObject('currentoken', this.cryptoSrv.convertText('encrypt', resData.token));
        }
      });
    } else {
      await this.authService.verificarToken(author.refreshToken, author.uid, author.email).subscribe(resData => {
        if (resData.token !== ''){
          this.localStorageSrv.addObject('currentoken', this.cryptoSrv.convertText('encrypt', resData.token));
        }
      });
    }
  }

}

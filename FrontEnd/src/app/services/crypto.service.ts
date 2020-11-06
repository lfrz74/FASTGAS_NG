import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  conversionEncryptDecryptOutput: string;

  constructor() { }

   convertText(conversion: string, plainText: string) {
    if (conversion === 'encrypt') {
      this.conversionEncryptDecryptOutput = CryptoJS.AES.encrypt(plainText.trim(), environment.PWD_AES_TKN).toString();
    } else {
      // tslint:disable-next-line: max-line-length
      this.conversionEncryptDecryptOutput = CryptoJS.AES.decrypt(plainText.trim(), environment.PWD_AES_TKN).toString(CryptoJS.enc.Utf8);
    }
    return this.conversionEncryptDecryptOutput;
  }
}

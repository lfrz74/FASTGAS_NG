const CryptoJS = require('crypto-js');

exports.convertText = (conversion, plainText) => {
    let conversionEncryptDecryptOutput = '';
    if (conversion === 'encrypt') {
        conversionEncryptDecryptOutput = CryptoJS.AES.encrypt(plainText.trim(), process.env.PWD_AES_TKN).toString();
    } else {
        conversionEncryptDecryptOutput = CryptoJS.AES.decrypt(plainText.trim(), process.env.PWD_AES_TKN).toString(CryptoJS.enc.Utf8);
    }
    return conversionEncryptDecryptOutput;
};


// ==UserScript==
// @name         LAB4-Cripto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site/
// @run-at       document-end
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @grant        none
// ==/UserScript==

//PASO 1
function obtenerConcatenacionPrimerCaracter(parrafo) {
  var oraciones = parrafo.split('. ');
  var resultado = '';

  for (var i = 0; i < oraciones.length; i++) {
    var oracion = oraciones[i];
    var primerCaracter = oracion.charAt(0);

    resultado += primerCaracter;
  }
  return resultado;
}
var parrafos = document.getElementsByClassName('Parrafo');
var parrafo = parrafos[0].innerText;
var concatenacion = obtenerConcatenacionPrimerCaracter(parrafo);
console.log("La llave es: ",concatenacion);

//PASO 2
var elementos = document.querySelectorAll('[class*="M"]');
var cant = 0;
for (var i = 0; i < elementos.length; i++) {
  cant++;
}
console.log("Los mensajes cifrados son: ", cant);

//PASO 3
(function() {
  'use strict';

  var expectedHash = "sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA==";
  var scriptElement = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"]');

  if (scriptElement && scriptElement.integrity !== expectedHash) {
    console.error("Integrity check failed for CryptoJS.");
    return;
  }
var key = CryptoJS.enc.Utf8.parse("CRIPTOCRIPTOCRIPTOCRIPTO");
for (var x = 0; x < elementos.length; x++) {
    var mensaje_cifrado = elementos[x].id;
    var mensaje_descifrado = CryptoJS.TripleDES.decrypt(mensaje_cifrado, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    console.log(mensaje_cifrado.toString() + " " + mensaje_descifrado.toString(CryptoJS.enc.Utf8));

    var nuevoElemento = document.createElement("p");
    nuevoElemento.textContent = mensaje_descifrado.toString(CryptoJS.enc.Utf8);
    document.body.appendChild(nuevoElemento);
}
})();

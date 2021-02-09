/**
 *  Reload.js
 *  
 *  Copyright (c) 2020, Elieder Sousa
 *  eliedersousa<at>gmail<dot>com
 *  
 *  Distributed under the MIT license. 
 *  See <license.txt> file for details.
 *  
 *  @date     28/06/20
 *  @version  v1.0
 *  
 *  @brief    Quando estou trabalhando com scripts, gosto de deixar a tela dividida entre o editor e o navegador, para ir acompanhando as mudanças sempre que eu gravo a página. Antes, usava extensões para os navegadores para fazer refresh automático na página a cada X segundos, mas este método é um pouco complicado de manter: uso dois navegadores e preciso de duas extensões para cada um. Sempre que abro eles, preciso ativar tais extensões, além do que nem sempre elas me atendem. A extensão que eu usava no Chrome virou um Malware! Então decidi que agora usaria este pedacinho de código que criei, mas que funciona muito bem. :) Como o método da classe é estático (o que facilita a chamada da função sem precisar instanciar a classe toda), não pude criar métodos para deixá-la mais bonita (pelo menos ainda não sei fazer isso). O importante é que funciona. Para usar, basta digitar no começo do script:
 *
 * @example Reload.init( x_segundos );
 */
class Reload {
	static init( time ) {
		window._re = new Date().getTime();
		setInterval( function() {
			document.title = '* reload in ' + (time - ((new Date().getTime() - window._re) / 1000 >> 0)) + 's *';
		}, 1000);
		setTimeout( function() {			
			location.reload();
		}, time * 1000);
	}
}
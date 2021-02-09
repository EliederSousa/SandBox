/**
 *  Preload.js
 *  
 *  Copyright (c) 2020, Elieder Sousa
 *  eliedersousa<at>gmail<dot>com
 *  
 *  Distributed under the MIT license. 
 *  See <license.txt> file for details.
 *  
 *  @date     28/06/20
 *  @version  v0.1
 *  
 *  @brief    Uma classe para fazer o pré-carregamento de recursos para um script.
 *  @example  Veja o arquivo PreloadTest.html para ter um exemplo de uso.
 */
Preload = (function(){
	let _total 			= 0;
	let _totalLoaded 	= 0;
	let _completed 		= 0;
	let _resources 		= [];
	let _errors			= [];
	
	return {
		/**
		 *  @brief Carrega um recurso para o buffer.
		 *  
		 *  @param [Object] _res Um objeto contendo os parâmetros para carregamento do recurso.
		 *  'type': O tipo de recurso, no caso 'image' ou 'audio';
		 *  'name': Um nome interno, que será usado para requisitar o recurso;
		 *  'src': O caminho (URI) do recurso. 
		 *  @return void
		 *  
		 *  @details Esta função pode lançar um erro caso o parâmetro 'type' não exista. 
		 *  Tipos suportados até então: 'image' e 'audio'.
		 */
		load: function( _res ) {
			_total++;
			_resources[_res.name] = {};
			_resources[_res.name].isReady 			= false;
			_resources[_res.name].type 				= _res.type;
			_resources[_res.name].src 				= _res.src;
			switch ( _res.type ) {
				case 'image':					
					_resources[_res.name].handler 			= new Image();					
					_resources[_res.name].handler.onload 	= function() {
						_totalLoaded++;
						_resources[_res.name].isReady 		= true;
					};
					_resources[_res.name].handler.onerror 	= function() { 
						_resources[_res.name].isReady 		= false;
						_errors.push( _res.name );
					};
					_resources[_res.name].handler.src 		= _res.src;
					break;
				case 'audio':					
					_resources[_res.name].handler 			= new Audio( _res.src );
					_resources[_res.name].handler.src 		= _res.src;
					break;
				default: 
					throw new Error( 'Preload::load: Tipo do recurso não encontrado.' );
			}
		},
		
		/**
		 *  @brief Alimenta o Preloader com um arquivo JSON.
		 *  
		 *  @param [String] File URI do arquivo
		 *  @return Void
		 *  
		 *  @details
		 */
		feed: function( _file ) {
			// Primeiro, vamos carregar o arquivo.
			let o = new XMLHttpRequest();
			o.overrideMimeType("application/json");
			o.open( 'GET', _file, true );
			o.setRequestHeader('Access-Control-Allow-Origin', 1);
			o.onreadystatechange = function() {
				if( o.readyState == 4 && o.status == "200" ) {
					let content = JSON.parse( o.responseText );
					console.log( content );
					// NODE.JS?
				}
			};
			o.send( null );			
		},
		
		/**
		 *  @brief Retorna uma array contendo todos os nomes internos que tiveram erro em seus carregamentos.
		 *  
		 *  @return Array
		 *  
		 *  @details Retorna uma array que pode ser pesquisada para verificar quais arquivos não existem,
		 *  ou retornaram erro ao serem carregados.
		 */
		getErrors: function() {
			return _errors;
		},
		
		/**
		 *  @brief Retorna a porcentagem carregada, com duas casas decimais.
		 *  
		 *  @return Int
		 */
		getPercent: function() {
			return (_totalLoaded / _total * 100).toFixed(2);
		},
		
		/**
		 *  @brief Retorna o recurso criado com o nome especificado.
		 *  
		 *  @param [String] _name O nome interno do recurso.
		 *  @return Image / Audio Element
		 */
		getResource: function( _name ) {
			return _resources[ _name ].handler;
		},
		
		/**
		 *  @brief Retorna true se o recurso foi carregado sem erros.
		 *  
		 *  @param [String] _name O nome interno do recurso.
		 *  @return Bool
		 */
		isLoaded: function( _name ) {
			return _resources[ _name ].isReady;
		},
		
		/**
		 *  @brief Limpa o buffer do Preloader, liberando a memória e zerando seu conteúdo.
		 *  @return void
		 */
		clear: function() {
			_resources = [];
		}
	}
	
})();
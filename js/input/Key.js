/**
 *  @brief Manipulador para teclado. *  
 *  @details Classe para criar listeners para teclado, configurando-os na inicialização.
 */
Key = (function() {
	
	let listen = function( event, callback ) {
		window.addEventListener( event, callback );
	};
	
	let keys = [];
	let count = 0;
    
    for ( let w = 0; w < 256; w++) {
        keys[w] = false;
    };
	
	listen( 'keydown', ( e ) => {
        // e.code retorna o nome da tecla ('Backspace, ControlLeft')
		keys[ e.keyCode ] = true;
	});
	
	listen( 'keyup', ( e ) => {
		keys[ e.keyCode ] = false;
	});
	
	return {
		
		get BACKSPACE		() { return 8 },
		get CAPSLOCK		() { return 20 },
		get SHIFT		() { return 16 },
		get CONTROL    	() { return 17 },
		get ALT			() { return 18 },
		get UP				() { return 38 },
		get DOWN			() { return 40 },
		get LEFT			() { return 37 },
		get RIGHT			() { return 39 },
		get SPACE			() { return 32 },
		get TAB				() { return 9 },
		get ESC				() { return 27 },
		get DELETE			() { return 46 },
		get HOME			() { return 36 },
		get PAGEUP			() { return 33 },
		get PAGEDOWN		() { return 34 },
		get CONTEXT			() { return 93 },
		isDown 			:	(k) => { return keys[ k ] },		
		getCount		:	() => { 
			let c = 0;
			for( let k in keys ) {
				if ( keys[k] ) c++;
			}
			return c;
		}
		
	};	
	
})();
Mouse = (function() {
	
    let _listen = function( elem, event, callback ) {
		elem.addEventListener( event, callback );
    };    
	
	// Propriedades privadas
    let isClicked = false;
    let isTouched = false;
    let position = {
        x: 0,
        y: 0
    };
    
    _listen( window, 'mousemove', ( e ) => {
        position.x = e.offsetX;
        position.y = e.offsetY;
    });
    
    _listen( window, 'mousedown', ( e ) => {
        isClicked = true;
    });
    
    _listen( window, 'mouseup', ( e ) => {
        isClicked = false;
    });

    return {
		get x() {
			return position.x;
		},
		get y() {
			return position.y;
		},
		get isDown() {
			return isClicked;
		},
		get isTouched() {
			return isTouched;
		},
		get click() {
			return "mousedown";
		},
		get move() {
			return "mousemove";
		},
		listen: ( $element, $event, $func ) => {
			if( !$element ) {
				throw new Error ("Mouse::listen: Elemento não encontrado.");
			};
			switch ($event) {
				// Mouse Events
				case "mousemove":
					_listen( $element, 'mousemove', ( e ) => {
						position.x = e.offsetX;
						position.y = e.offsetY;
					});
					break;
				case "mousedown":
					/* TODO: listen( 'mousedown'... Manipular ambos botoes. Perceba que ele só atualiza quando clica. Se recarregar a página mantendo o mouse pressionado, não vai ter chamado a função e ela será 'false', porém com o mouse clicado. */
					_listen( $element, 'mousedown', ( e ) => {
						isClicked = true;
						$func();
					});
					break;
				case "mouseup":
					_listen( $element, 'mouseup', ( e ) => {
						isClicked = false;
						$func();
					})
					break;
				case "touchmove":
					listen( $element, 'touchmove', ( e ) => {
						let touches = e.changedTouches;        
						if( touches ) {
							isTouched = true;
							e.preventDefault();
							position.x = touches[0].pageX;
							position.y = touches[0].pageY;
						};
					});
					break;
				case "touchstart":
					_listen( $element, 'touchstart', ( e ) => {
						isTouched = true;
					});
					break;
				case "touchend":
					_listen( $element, 'touchend', ( e ) => {
						isTouched = false;
					});
					break;
				default:
					throw new Error( "MOUSE::listen: Evento não encontrado" );
					
			}
		}
    };
    
})();
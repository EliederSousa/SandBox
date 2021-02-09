// Esta classe faz tracking de um objeto. 
class Camera extends Item {
	constructor( POINT, CONFIG ) {
		if( !CONFIG ) CONFIG = {};
		CONFIG.type = "Camera";
		super( POINT, CONFIG );    
	};
}
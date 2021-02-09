class Item {
	constructor( POINT, CONFIG ) {
		if ( POINT.constructor.name != "Point" ) {
			throw new Error( " Item::constructor: O primeiro argumento não é instância da classe Point." ); 
		};
		
		// Propriedades que todos os objetos tem.
		// this.id 		= Enviroment.generateID();
        this.id         = (Math.random() * 8192) >> 0;
		this.type 		= CONFIG.type;
		
		// Propriedade de posição, direção e física.
		// Position só pode ser instância de Point() ou Vector();
		this.position 	= POINT;
		this.rotation	= CONFIG.rotation || 0;		

		// Mudar para 'center' desenha a partir do centro.
		this.mode		= CONFIG.mode || "upleft";
		
		// Propriedades de desenho.
		// Não definir valor default para estas linhas é importante para
		// Screen.drawItem saber se vai desenhar algum contorno ou não.
		// Ele não desenha contorno se lineColor for undefined.
		this.lineColor 	= CONFIG.lineColor;
		this.lineWidth  = CONFIG.lineWidth;
		this.color		= CONFIG.color;
		
		// Um som (carregado por Preload), associado a este item.
		this.sound		= CONFIG.sound;
		
	}
	
	update( POSITION ) {
		this.position = POSITION;
	}
	
	playSound() {
		Preload.getResource( this.sound ).cloneNode(true).play();
	}
}
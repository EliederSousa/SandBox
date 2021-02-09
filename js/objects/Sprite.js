class Sprite extends Item {
	
	constructor( POINT, CONFIG ) {
		if( typeof(CONFIG) != "object" ) throw new Error ( "Sprite::constructor: Argumento não é um objeto." );
		CONFIG.type = 'Sprite';
		super( POINT, CONFIG );
		this.loaded = false;
		// Número de frames no sprite em uma linha.
		this.xFrames = CONFIG.xFrames || 1;
		// Número de frames no sprite.
		this.yFrames = CONFIG.yFrames || 1;
		// Número total de frames na imagem.
		this.totalFrames = CONFIG.totalFrames || 1;
		// "Velocidade": quantidade de ticks para mudar de frame.
		this.velocity = CONFIG.vel || 1;
		this.tick = 0;
		// O frame que está sendo animado.
		this.actualFrame = 0;
		// É apenas uma imagem?
		this.isStatic = (CONFIG.isStatic !== undefined) ? CONFIG.isStatic : true;
		
		// O sprite irá terminar a animação no último frame?
		this.loop = CONFIG.loop || false;
		// Caso não seja um loop, a animação terminou?
		this.hasFinished = false;
		
		// Variáveis para guardar o tamanho da imagem inteira.
		this.width, this.height = 0;
		// Variáveis para guardar o tamanho de um único frame.
		this.frameWidth, this.frameHeight = 0;
		// Variável para guardar o tamanho da imagem de saída (para desenho)
		this.sizeFactor = CONFIG.sizeFactor || 1;
		// Variáveis que mapeiam a posição de desenho do frame atual.
		this.frameAt = {x: 0, y: 0};
		// Carregando a imagem.
		// TODO: Fazer um preloader, e puxar a imagem dele. 
		// Se cada instância de um objeto no script tiver que criar a 
		// imagem do zero, será um desperdício de memória.
		this.image = CONFIG.image;
		this.width = this.image.width;
		this.height = this.image.height;
		this.frameWidth = this.width / this.xFrames;
		this.frameHeight = this.height / this.yFrames;
        this.bodySize = {
            width: this.frameWidth / this.sizeFactor,
            height: this.frameHeight / this.sizeFactor
        };
	}
	
	// Modifica o frame atual caso 'hasFinished' for false
	animate() {
		if( !this.isStatic && !this.hasFinished ) {
			if( this.tick == this.velocity ) {
				this.actualFrame++;
				this.tick = 0;
			} else {
				this.tick++;
			}
			
			
			this.frameAt = {
				x: (this.actualFrame % this.xFrames) * this.frameWidth,
				y: ((this.actualFrame / this.xFrames) >> 0) * this.frameHeight
			};
			
			if( this.actualFrame >= this.totalFrames ) {
				if( this.loop ) {
					this.actualFrame = 0;
				} else {
					this.hasFinished = true;
				}
			}
		}
	}
    
    nextFrame() {
        this.actualFrame++;
        if( this.actualFrame >= this.totalFrames ) {
            this.actualFrame = 0;
        }
        
        this.frameAt = {
            x: (this.actualFrame % this.xFrames) * this.frameWidth,
            y: ((this.actualFrame / this.xFrames) >> 0) * this.frameHeight
        };
    }
	
	hitTest( POINT ) {
		// Checagem simples para saber se o ponto está na área AABB deste item.
		if( this.mode !== "center" ) {
			if( (POINT.x >= this.position.x) && (POINT.x <= (this.position.x + this.width/this.sizeFactor) ) ) {
				if( (POINT.y >= this.position.y) && (POINT.y <= (this.position.y + this.height/this.sizeFactor)) ) {
					return true;
				}
			}
		} else {
			if( (POINT.x >= (this.position.x - this.width / this.sizeFactor / 2)) && (POINT.x <= (this.position.x + this.width / this.sizeFactor / 2)) ) {
				if( (POINT.y >= (this.position.y - this.height / this.sizeFactor / 2 )) && (POINT.y <= (this.position.y + this.height / this.sizeFactor / 2)) ) {
					return true;
				}
			}
		}
		return false;
	}
}
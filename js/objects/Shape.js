class Shape extends Item {
    constructor( POINT, CONFIG ) {
		CONFIG.type = "Shape";
		super( POINT, CONFIG );
		
        this.vertices;

        // Propriedades de dimensão
        this.size;
        this.width;
        this.height;
        this.radius;
		
		// Propriedades de posição
		this.center;
    }	
    
    updatePosition( POSITION ) {
        this.position = POSITION;
    }
};

class Rectangle extends Shape {
	constructor ( POINT, CONF ) {
		let CONFIG;
		if( CONF.constructor.name === "Point" ) {
			let size = CONF.clone();
			size.sub( POINT );
			
			CONFIG = {
				width: size.x,
				height: size.y
			};
		} else throw new Error( "Rectangle::constructor: O tamanho não é instância da classe Point" );
		super( POINT, CONFIG );
		this.width 		= CONFIG.width;
		this.height		= CONFIG.height;
	}
}

class Square extends Shape {
	constructor ( POINT, CONF ) {
		let CONFIG = {
			size: typeof( CONF ) === "number" ? CONF : CONF.size
		};
		super( POINT, CONFIG );
		this.size 		= CONFIG.size;
	}
}

class Line extends Shape {
	constructor ( POINT, CONFIG ) {
		super( POINT, CONFIG );
		this.to = CONFIG.to;
	}
}

class Circle extends Shape {
	constructor ( POINT, CONFIG ) {     
		super( POINT, CONFIG );
		this.radius = CONFIG.radius;
	}
}

/*class Circle extends Shape {
    constructor( CONFIG ) {
        super( CONFIG );
        this.type = 'circle';
        this.color = new Color( 1, 1, 1, 1 );
        this.lineColor = new Color( ColorName.white );
        this.lineWidth = 1;
    }
};

class Line extends Shape {
    constructor( CONFIG ) {
        super( CONFIG );
        this.type = 'line';
        this.lineColor = 'white';
        this.lineWidth = 1;
    }
};

class Rectangle extends Shape {
    constructor( CONFIG ) {
        super( CONFIG );
        this.type = 'rect';
        this.mode = 'center';
        this.lineColor = 'white';
        this.lineWidth = 1;
    }
};


class Square extends Shape {
    constructor( CONFIG ) {
        super( CONFIG );
        this.type = 'square';
        this.mode = 'center';
        this.color = new Color( 1, 1, 1, 0 );
        this.lineColor = 'white';
        this.lineWidth = 1;
    }
}

class Triangle extends Shape {
    constructor( CONFIG ) {
        super( CONFIG );
        this.type = 'triangle';
        this.lineColor = 'white';
        this.lineWidth = 1;
    }
    
    // Vamos calcular o baricentro do triângulo, e defini-lo como
    // a posição dele (o centro do triângulo).
    getCenter() {
        if( this.vertices ) {
            let tempX = (this.vertices[0][0] + this.vertices[1][0] + this.vertices[2][0]) / 3;
            let tempY = (this.vertices[0][1] + this.vertices[1][1] + this.vertices[2][1]) / 3;
            this.position = new Point( tempX, tempY );
        }
        return this.position.clone();
    };
}

class Polygon extends Shape {
    // ISREGULAR indica que o polígono é regular (lados e ângulos iguais)
    constructor( ISREGULAR, CONFIG ) {
        super( ISREGULAR, CONFIG );
        this.type       = 'polygon';
        this.isRegular  = ISREGULAR;
        this.lineColor  = 'white';
        this.lineWidth  = 1;
        if ( CONFIG.nvertices ) this.nvertices = CONFIG.nvertices;
    }
}*/
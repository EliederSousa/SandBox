// DEPENDE DA BIBLIOTECA COLOR.JS e VECTOR.JS
Screen = function ( MODE ) {
    
    // Propriedades básicas
    this.canvas     = document.createElement( "canvas" );
	this.canvas.id  = "canvas_layer";
    this.context    = this.canvas.getContext( "2d" );
    this.width      = 0;
    this.height     = 0;
    this.center     = {x: 0, y: 0};
    this.bgColor    = new Color( .2 );
	this.zoom		= 1;
    
    // Descomente para criar uma borda ao redor do canvas.
    //this.canvas.style.border = "2px solid red";

    if ( MODE === "fullscreen" ) {
        document.body.style.margin = 0;
        document.body.style.overflow = "hidden";
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };
        document.body.appendChild( this.canvas );
    } else {
		// TODO: Workaround: "-8" foi a forma que encontrei para que o
		// canvas fique dentro de uma div com padding e borda de 2px.
        this.width  = this.canvas.width = MODE.offsetWidth - 8;
        this.height = this.canvas.height = MODE.offsetHeight - 8;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };
        
        MODE.appendChild( this.canvas );        
    }
	
	this.drawItem = function( ITEM, CAMERA ) {
		this.context.save();
		this.context.scale(this.zoom, this.zoom);
                
		// Trabalhando as cores primeiro.
		if ( ITEM.color ) {
			this.context.fillStyle = ITEM.color.CSS;
		}
		
		if ( ITEM.lineColor ) {
			this.context.strokeStyle = ITEM.lineColor.CSS;
			this.context.lineWidth = ITEM.lineWidth || 1;
		}
		
		// E as posições dos objetos. Clonamos essas posições para
		// trabalharmos com o conceito de 'camera'.
        let startingPointToDraw = ITEM.position.clone();
		if( ITEM.constructor.name === "Line" ) {
			toPointToDraw = ITEM.to.clone();
		};
		
        if( CAMERA ) {
			startingPointToDraw.sub( new Point (
				CAMERA.position.x - this.center.x,
				CAMERA.position.y - this.center.y) );
			
			if ( ITEM.constructor.name === "Line" ) {
				toPointToDraw.sub( new Point( 
					CAMERA.position.x - this.center.x,
					CAMERA.position.y - this.center.y ) );
			}
        }
        
        if( ITEM.rotation ) {
            this.context.translate( startingPointToDraw.x, startingPointToDraw.y );
            this.context.rotate( ITEM.rotation * Math._PI180 );
            this.context.translate( -startingPointToDraw.x, -startingPointToDraw.y );
        };
        
		// Acha o centro da forma, para desenhar a partir dele.
		// TODO: Isto deveria ser calculado em cada forma, e não aqui.
        if ( ITEM.mode && ( ITEM.mode === 'center' ) ) {
            if ( ITEM.constructor.name === 'Square' ) {
				startingPointToDraw.sub( new Point (
					ITEM.size / 2,
					ITEM.size / 2
				) );
			} else if ( ITEM.constructor.name === "Text" ) {				
				let temp = this.context.measureText( ITEM.text );
				let tempWidth = temp.width;
				let tempHeight = temp.actualBoundingBoxDescent - temp.actualBoundingBoxAscent;
				startingPointToDraw.sub( new Point(
					tempWidth,
					tempHeight / 2
				) );
			} else if ( ITEM.constructor.name === "Sprite") {
                startingPointToDraw.sub( new Point(
					(ITEM.frameWidth / 2) / ITEM.sizeFactor,
					(ITEM.frameHeight / 2) /ITEM.sizeFactor
				) );
			} else {
                startingPointToDraw.sub( new Point(
					ITEM.width / 2,
					ITEM.height / 2
				) );
            }
        }
		switch ( ITEM.type ) {
			case 'Text':
				// TODO: STROKETEXT, ALIGN, STYLES ( ITALIC, BOLD, etc)
				this.context.font = ITEM.font || "14px Consolas";
				this.context.fillText( ITEM.text, startingPointToDraw.x, startingPointToDraw.y );
				if( ITEM.lineColor ) {
					this.context.strokeText( ITEM.text, startingPointToDraw.x, startingPointToDraw.y );
				};				
				break;
			case 'Shape':
				switch ( ITEM.constructor.name ) {
					case 'Rectangle':
						if( ITEM.color ) {
                            this.context.fillRect( startingPointToDraw.x, startingPointToDraw.y, ITEM.width, ITEM.height );
                        }
						if ( ITEM.lineColor ) {
							this.context.strokeRect( startingPointToDraw.x, startingPointToDraw.y, ITEM.width, ITEM.height );
						};
						break;
					case 'Square':
						if( ITEM.color ) {
                            this.context.fillRect( startingPointToDraw.x, startingPointToDraw.y, ITEM.size, ITEM.size );
                        }
						if ( ITEM.lineColor ) {
							this.context.strokeRect( startingPointToDraw.x, startingPointToDraw.y, ITEM.size, ITEM.size );
						};
						break;
					case 'Line':
						this.context.beginPath();
						this.context.moveTo(startingPointToDraw.x, startingPointToDraw.y);
						this.context.lineTo(toPointToDraw.x, toPointToDraw.y);
						this.context.closePath();
						this.context.stroke();
						break;
					case 'Circle':
						this.context.beginPath();
						this.context.arc( startingPointToDraw.x, startingPointToDraw.y, ITEM.radius, 0, Math.PI * 2 );
                        if ( ITEM.color ) {
                            this.context.fill();
                        }
						if ( ITEM.lineColor ) {
							this.context.stroke();
						};
						break;
				};				
				break;
			case 'Sprite':
				// this.image, tempX, tempY, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth/this.sizeFactor, this.frameHeight/this.sizeFactor
				if ( ITEM.frameWidth ) {
					this.context.drawImage( ITEM.image, ITEM.frameAt.x, ITEM.frameAt.y, ITEM.frameWidth, ITEM.frameHeight, startingPointToDraw.x, startingPointToDraw.y, (ITEM.frameWidth / ITEM.sizeFactor), (ITEM.frameHeight / ITEM.sizeFactor) );
				} else {
					this.context.drawImage( ITEM.image, ITEM.position.x, ITEM.position.y );
				}
				break;
			case 'Camera':
				break;
			default:
				throw new Error( "Screen::drawItem: Tipo do objeto não especificado.");
		};
		
		this.context.restore();
	};
	
	// Apaga a tela para um novo frame no canvas.
    this.draw = function () {
        this.context.save();
        this.context.fillStyle = this.bgColor.CSS;
        this.context.fillRect( 0, 0, this.width, this.height );
        this.context.restore();
    };
    
    this.measureText = function( text ) {
        return this.context.measureText( text );
    };

    /**
     * Configura uma nova cor para o background do canvas.
     * @param {COLOR} Cor definida com new Color(r,g,b,a);
     * @returns {void}
     */
    this.setBackgroundColor = function ( _COLOR ) {
        this.bgColor = _COLOR;
    };
	
	// Função específica para desenhar imagens.
	// É util ao usar a classe Screen sozinha, somente para desenhar uma
	// imagem mesmo.
	this.drawImage = function( IMAGE, SX, SY, SW, SH, DX, DY, DW, DH ) {
		if ( SW ) {
			this.context.drawImage( IMAGE, SX, SY, SW, SH, DX, DY, DW, DH );
		} else {
			this.context.drawImage( IMAGE, SX, SY );
		}		
	};
    
	/* case 'triangle':
		this.context.beginPath();
		this.context.moveTo( SHAPE.vertices[0][0], SHAPE.vertices[0][1]);
		this.context.lineTo( SHAPE.vertices[1][0], SHAPE.vertices[1][1]);
		this.context.lineTo( SHAPE.vertices[2][0], SHAPE.vertices[2][1]);
		if( SHAPE.lineColor ) {
			this.context.closePath();
			this.context.stroke();
		} else {
			this.context.fill();
		};
		break;
	case 'polygon':
		this.context.beginPath();
		this.context.moveTo( SHAPE.position.x + SHAPE.radius * Math.cos(0), SHAPE.position.y + SHAPE.radius * Math.sin(0));
		// Cada um dos vértices do polígono.
		for( let i = 1; i < SHAPE.nvertices; i++ ) {
			this.context.lineTo( SHAPE.position.x + SHAPE.radius * Math.cos( i * Math._TWOPI / SHAPE.nvertices), SHAPE.position.y + SHAPE.radius * Math.sin( i * Math._TWOPI / SHAPE.nvertices));
		};
		if( SHAPE.lineColor ) {
			this.context.closePath();
			this.context.stroke();
		} else {
			this.context.fill();
		};
		break; */
		
    this.draw();
};
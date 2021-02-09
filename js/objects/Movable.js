class MovableObject {
	constructor( CONFIG ) {
		this.id             = CONFIG.id || Engine.generateID();
        this.cloneData      = CONFIG;
		this.position       = CONFIG.position || new Point( 0, 0 );
		this.velocity       = CONFIG.velocity || new Point( 0, 0 );
		this.acceleration   = CONFIG.acceleration   || new Point( 0, 0 );
		this.maxVelocity    = CONFIG.maxVelocity    || Engine.maxVelocity;
		this.rotation       = CONFIG.rotation       || 0;
		this.velRotation    = CONFIG.velRotation    || 0;
		this.rotationDecay  = CONFIG.rotationDecay  || .985;
		this.mass           = CONFIG.mass           || 1;	
		this.color          = CONFIG.color;
		this.velocityLineColor      = new Color( .18, .8, .4, .8 );
		this.accelerationLineColor  = new Color( 1, .32, .32, .8 );
        
        this.shape                  = CONFIG.shape;
		this.velocityShape          = new Line( this.position, {
            to: this.position,
            lineColor: this.velocityLineColor,
            lineWidth: 1            
        });

		this.accelerationShape      = new Line( this.position, {
			to: this.position,
			lineColor: this.accelerationLineColor,
			lineWidth: 2
		});
	};
    
    clone( pos ) {
        let temp = new MovableObject( this.cloneData );
        temp.position = pos;
        temp.shape.image = Preload.getResource("img" + (((Math.random() * 2) >> 0) + 1));
        return temp;
    };
	
	applyForce( F ) {
		let force = F.clone();
		force.scale( 1 / this.mass );
		// 2ª Lei de Newton.
		this.acceleration.sum( force );
	};
	
	/**
	 *  Rotina de movimentação de um objeto
	 *  Calculando forças. Para calcular uma força, precisamos conhecer a 2ª Lei de Newton.
	 *  +-----------------+
	 *  +     F = m*a     +
	 *  +-----------------+
	 *  Preciso conhecer a aceleração do meu objeto. Para isto, vamos precisar aplicar uma força F, e conhecer a massa m dele.
	 *  a = F/m;
	 *  Digamos que a masssa é igual a "1". Logo, a aceleração será igual a força aplicada sobre o objeto.
	 *  Fazemos isso chamando a função "applyForce" contida no objeto.
	 *  Após conhecer a aceleração, devemos aplicar essa aceleração sobre a velocidade do objeto, somando.
	 *  Por fim, devemos somar a velocidade do objeto em sua posição.   
	 **/
	update( ENV ) {
		this.velocity.sum( this.acceleration );
		this.velocity.limit( this.maxVelocity );                
		this.position.sum( this.velocity );
		if( Engine.circularScreen ) {
			if ( this.position.x > ENV.screen.width ) this.position.sub( new Point(ENV.screen.width, 0) );
			if ( this.position.y > ENV.screen.height) this.position.sub( new Point(0,  ENV.screen.height) );
			if ( this.position.x < 0 ) this.position.sum( new Point(ENV.screen.width, 0) );
			if ( this.position.y < 0 ) this.position.sum( new Point(0, ENV.screen.height) );
		}
		
		this.shape.position = this.position;
		this.shape.rotation = this.rotation;
		
		if( Math.abs(this.velRotation) > 0.001 ) {
			this.rotation += this.velRotation;
			this.velRotation *= this.rotationDecay;
		}

		if ( Engine.velocityLine ) {
			let velocityVec = this.velocity.clone();
			velocityVec.scale( 20 );
			velocityVec.sum( this.position );
			this.velocityShape.position = this.position;
			this.velocityShape.to = velocityVec;

			let accelerationVec = this.acceleration.clone();
			accelerationVec.scale( 400 );
			accelerationVec.sum( this.position );
			this.accelerationShape.position = this.position;
			this.accelerationShape.to = accelerationVec;
		}

		this.acceleration.scale( 0 );
	};
	
	debug() {
		console.log( "------ DEBUG -------" );
		console.log( "Position " + this.position.x + ',' + this.position.y );
		console.log( "Velocity " + this.velocity.x + ',' + this.velocity.y );
		console.log( "Acceleration " + this.acceleration.x + ',' + this.acceleration.y );
		console.log( "--------------------" );
	};
};
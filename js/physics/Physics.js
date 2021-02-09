Physics = function () {
    this.groundFriction = .02;
    this.groundNormal = 1;
    this.frictionMag = this.groundFriction * this.groundNormal;
    this.hasGravity = Engine.hasGravity;
    this.gravity = new Point( 0, .25 );

    this.applyForces = function ( OBJLIST ) {
        // Vamos aplicar as forças em todos os objetos da lista.
        for ( let x = 0; x < OBJLIST.length; x++ ) {
            
            // Vamos trabalhar neste objeto.
            let obj = OBJLIST[x];            
            this.resolveCollisions( obj, OBJLIST, x );
            
            // Aplicando Fricção
            let friction = obj.velocity.clone();
            friction.normal();
            friction.scale( -1 * this.frictionMag );
            this.addForce( obj, friction );

            // Aplicando Gravidade
            if ( this.hasGravity )
                this.addForce( obj, this.gravity );
            
            // SEEK
            /*if ( x == 0 ) {
                let maxForce = .1;
                let desiredVel = new Point( Mouse.x, Mouse.y );
                
                desiredVel.sub(obj.position);                
                if( Mouse.isDown ) desiredVel.scale( -1 );                
                desiredVel.normal();
                desiredVel.scale(obj.maxVelocity);
                desiredVel.sub(obj.velocity);
                desiredVel.limit(maxForce);
                
                this.addForce( obj, desiredVel );
            }*/
        }
    };
    
    this.resolveCollisions = function( OBJ, OBJLIST, IGNORE ) {
        if( OBJ.position.y > 400 ) {
            this.addForce( OBJ, new Point(0, -10) );
        }
            for( let y = 0; y < OBJLIST.length; y++ ) {
                
                if( y == IGNORE ) continue;
                
                // Vamos testar a colisão com este outro objeto.
                let obj2 = OBJLIST[y];
                
                if( this.pointCircleCollision( OBJ, obj2 ) ) {
                    let force = new Point( Math.random() * 4 - 2, Math.random() * 4 - 2);
                    let oppositeForce = force.clone();
                    oppositeForce.scale( -1 );
                    this.addForce( OBJ, force );
                    this.addForce( obj2, oppositeForce );
                    OBJ.velRotation = force.x * (Math.random() * 20);
                    obj2.velRotation = force.y * (Math.random() * 20);
                }
            }
    };
    
    this.pointCircleCollision = function( obj1, obj2 ) {
        // Vamos tratar todos os objetos como círculos por enquanto
        let radius1 = obj1.shape.radius || obj1.shape.size || obj1.shape.bodySize.width/2;
        let radius2 = obj2.shape.radius || obj2.shape.size || obj2.shape.bodySize.width/2;
        let xDist = obj2.position.x - obj1.position.x;
        let yDist = obj2.position.y - obj1.position.y;
        let distance = Math.sqrt((xDist*xDist)+(yDist*yDist));
        let minDist  = radius1 + radius2;
        if( distance < minDist ) return true;
        return false;
    }
    
    this.hitTest = function( obj1, obj2 ) {
        
        let obj1Size = obj1.shape.size || obj1.shape.radius;
        let obj2Size = obj2.shape.size || obj2.shape.radius;
        let maxDistance = new Point( (obj1Size/2) + (obj2Size/2), (obj1Size/2) + (obj2Size/2) );
        
        // Point-Circle Collision
        //let xDist = obj2.position.x - obj1.position.x;
        //let yDist = obj2.position.y - obj1.position.y;
        //let distance = Math.sqrt( Math.pow( xDist, 2) + Math.pow( yDist, 2) );
        //if( distance < obj1Size + obj2Size)
        
        let distX = Math.abs(obj2.position.x - obj1.position.x);
        let distY = Math.abs(obj2.position.y - obj1.position.y);
        
        if( (distX < maxDistance.x) && ( distY < maxDistance.y )) {
            return true;
        } else {
            return false;
        }
    };
    
    // Aplica uma força em um objeto. A soma de todas as forças aplicadas é a força resultante.
    this.addForce = function ( OBJ, FORCE ) {
        OBJ.applyForce( FORCE );
    };
};
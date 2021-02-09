Enviroment = (function() {
    
    // Containers e objetos.
    this.emmiter = new ObjectContainer();
    this.objects = new ObjectContainer(); 
    
    this.physicsSolver = new Physics();
    
    this.box = new DebugBox();    
    
    // Screen Handler
	this.screen = new Screen ( "fullscreen" );
	screen.setBackgroundColor( new Color ( .2 ) );
	screen.draw();
    
    // Camera (deve ser declarada após a screen, por que SCREEN usa a posição inicial dela.)
    this.camera = new Camera( new Point(this.screen.center.x, this.screen.center.y) );
    
    // Timers
    this.timer = new Timer();
    
    this.add = function( _item ) {
        this.objects.add( _item );
    };
    
    this.debug = function() {
        return objects;
    };
    
    this.loop = function() {
        requestAnimationFrame( this.loop.bind( this ) );
        if( window.main ) main(); // Se existir a função main, inicia ela.
        screen.draw();
        
        // Criação de objetos.
        // Checa os emmiters.
        for( let w = 0; w < emmiter.getCount(); w++ ) {
            let emit = emmiter.getObject(w);
            if( emit.isReadyToCreate() ) {
                tempObject = emit.create();
                add(tempObject);
            }
        };
       
        
        physicsSolver.applyForces( objects.getAll() );
        
        // Desenha os emmiters
        for( let w = 0; w < emmiter.getCount(); w++ ) {
            let emit = this.emmiter.getObject(w);
            emit.update();
            screen.drawItem( emit.shape, this.camera );
            screen.drawItem( emit.textShape, this.camera );
        }
        
        // Desenha os objetos
        for( let w = 0; w < objects.getCount(); w++ ) {
            tempObj = objects.getObject(w);
            if (tempObj.constructor.name == "MovableObject") {
                // Aplica a aceleração final e atualiza os shapes do objeto
                tempObj.update( this );
                screen.drawItem( tempObj.shape );
                if( Engine.velocityLine ) {
                    screen.drawItem( tempObj.velocityShape, this.camera );
                    screen.drawItem( tempObj.accelerationShape, this.camera );
                }
            }
        }
        
        // Desenha a debugBox, se estiver ativada.
        if( Engine.debugBox ) box.drawMe( screen, objects.getCount() );
    };

    // Inicia o loop.
    this.loop();
	
	return {
        // Por enquanto não encontrei forma de contar quantos argumentos
        // foram passados para a função anônima add(). Por isso, só dá
        // para adicionar um elemento por vez. Use um loop!
        add: ( _item ) => { return this.add( _item ); },
        del: ( _item ) => { return this.del( _item ); },
        setBackgroundColor: ( _color ) => { this.screen.setBackgroundColor( _color ); },
        debugBox: (boolState) => { this.debugBox = boolState; },
        debugBoxPosition: (_x, _y) => { box.setPosition( _x, _y ); },
        getScreenSize: () => { return { width: this.screen.width, height: this.screen.height }; },
		debug: () => { return this.debug(); },
        addEmmiter: ( _config ) => { this.emmiter.add( new EmmiterManager( _config ) ); }
	};
	
})();
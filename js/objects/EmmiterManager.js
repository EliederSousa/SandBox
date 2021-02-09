/**
 *  EmmiterManager.js
 *  
 *  Copyright (c) 2020, Elieder Sousa
 *  eliedersousa<at>gmail<dot>com
 *  
 *  Distributed under the MIT license. 
 *  See <license.txt> file for details.
 *  
 *  @date     08/02/21
 *  @version  v0.2
 *  
 *  @brief    Esta classe cria um Emmiter. Emmiters são objetos que criam
 *  outros objetos periodicamente (eles os emitem), em uma certa área do ambiente. Eles só podem criar objetos que forem passados para eles, na verdade, eles criam uma cópia do objeto em uma posição aleatória dentro da sua área. O tempo de criação é configurado através do minTime e maxTime.
 *  @depends MathUtils, Objects (Item/Shape/etc), Color, Timer
 */
EmmiterManager = function ( CONFIG ) {
    this.position = CONFIG.position;
    this.radius = CONFIG.radius;
    this.minTime = CONFIG.minTime;
    this.maxTime = CONFIG.maxTime;
    this.nextCreationTime = CONFIG.minTime;
    this.timer = new Timer();
    this.color = new Color( Math.random(), Math.random(), Math.random(), .2 );
    this.textPosition = this.position.clone();
    this.textPosition.sub( ( new Point( 12, this.radius - 12 ) ) );
    this.actualText = this.nextCreationTime - this.timer.compare();
    
    this.particle = CONFIG.particle;
    
    this.shape = new Circle( this.position.clone(), {
        color: this.color,
        mode: 'center',
        radius: this.radius,
    });
    
    this.textShape = new Text( this.textPosition, {
        color: new Color('silver'),
        text: "",
        font: "bold 12px Consolas"
    });

    this.isReadyToCreate = function () {
        if ( this.timer.compare() > this.nextCreationTime ) {
            this.timer.update();
            this.nextCreationTime = Math.floor( Math.random() * ( this.maxTime - this.minTime + 1 ) ) + this.minTime;
            return true;
        }
        return false;
    };
    
    this.create = function() {
        pos = Math.randomInsideCircle(this.position, this.radius);
        return this.particle.clone( pos );
    };
    
    this.update = function() {        ;
        this.textShape.text = ((this.nextCreationTime - this.timer.compare()) / 1000).toFixed(1);
    };
};
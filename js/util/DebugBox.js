class DebugBox {
    constructor() {
        this.x = 5;
        this.y = 5;
        this.boxLines = 6;
        
        this.box = new Rectangle( new Point( this.x, this.y ), new Point( 128, 15 * this.boxLines + 14 ));
        this.box.lineColor = new Color( 'chocolate' );
        
        this.regularText = new Text( new Point( 15, 15 ), {
            text:   "",
            color:  new Color( 'silver' ),
            font:   '12px Consolas'
        });
    
        this.booleanText = new Text ( new Point(100, 100), {
            text: "true",
            color: new Color( 'silver' ),
            font: 'bold 13px Consolas'
        });
    };
    
    setPosition( X, Y ) {
        this.x = X;
        this.y = Y;
    }
    
    drawMe( SCREEN, COUNTER ) {
        let xTemp = this.x + 5;
        let yTemp = this.y + 15;
        this.regularText.position = new Point( xTemp, yTemp );
        this.regularText.text = "  SANDBOX v0.1";
        this.regularText.color = new Color( 'tomato' );
        this.regularText.font = "bold 13px Consolas";
        SCREEN.drawItem( this.regularText );
        
        this.regularText.position = new Point( xTemp, yTemp += 15 );
        this.regularText.text = "Mouse: " + Mouse.x + ", " + Mouse.y;
        this.regularText.color = new Color( 'silver' );
        this.regularText.font = "12px Consolas";
        SCREEN.drawItem( this.regularText );
        
        this.regularText.position = new Point( xTemp, yTemp += 15 );
        this.regularText.text = "Clicked?" ;
        SCREEN.drawItem( this.regularText );
        
        this.booleanText.position = new Point(xTemp + 20 + SCREEN.measureText(this.regularText.text).width, yTemp);
        this.booleanText.text = "" + Mouse.isDown;
        this.booleanText.color = Mouse.isDown ? new Color( 'lime' ) : new Color( 'red' );        
        SCREEN.drawItem(this.booleanText);
        
        this.regularText.position = new Point( xTemp, yTemp += 15 )
        this.regularText.text = "SHIFT:";
        SCREEN.drawItem( this.regularText );
        
        this.booleanText.position = new Point(xTemp + 13 + SCREEN.measureText(this.regularText.text).width, yTemp);
        this.booleanText.text = "" + Key.isDown( Key.SHIFT );
        this.booleanText.color = Key.isDown( Key.SHIFT ) ? new Color( 'lime' ) : new Color( 'red' );        
        SCREEN.drawItem(this.booleanText);
        
        this.regularText.position = new Point( xTemp, yTemp += 15 )
        this.regularText.text = "CONTROL:";
        SCREEN.drawItem( this.regularText );
        
        this.booleanText.position = new Point(xTemp + 5 + SCREEN.measureText(this.regularText.text).width, yTemp);
        this.booleanText.text = "" + Key.isDown( Key.CONTROL );
        this.booleanText.color = Key.isDown( Key.CONTROL ) ? new Color( 'lime' ) : new Color( 'red' );
        
        this.regularText.position = new Point( xTemp, yTemp += 15 );
        this.regularText.text = "Objects: " + COUNTER;
        this.regularText.color = new Color( 'silver' );
        this.regularText.font = "12px Consolas";
        SCREEN.drawItem( this.regularText );

        this.box.position = new Point(this.x, this.y);
        
        SCREEN.drawItem(this.booleanText);
        SCREEN.drawItem(this.box)
    };
}
Point = function ( _X, _Y ) {
    if( _Y === "angle" ) {
        this.x = (Math.cos(Math._PI180 * _X));
        this.y = (Math.sin(Math._PI180 * _X));
    } else {
        this.x = _X || 0;
        this.y = _Y || 0;
    };
    
    this.clone = function() {
        return new Point( this.x, this.y );
    };
    
    this.sum = function ( _POINT ) {
        this.x += _POINT.x;
        this.y += _POINT.y;
    };

    this.sub = function ( _POINT ) {
        this.x -= _POINT.x;
        this.y -= _POINT.y;
    };

    this.mul = function ( _POINT ) {
        this.x *= _POINT.x;
        this.y *= _POINT.y;
    };

    this.div = function ( _POINT ) {
        this.x /= _POINT.x;
        this.y /= _POINT.y;
    };
    
    // Função para multiplicar ambos x e y por um valor único.
    // Útil após criar um vetor normalizado.
    this.scale = function( _FACTOR ) {
        this.x *= _FACTOR;
        this.y *= _FACTOR;
    };
    
    this.limit = function ( MAX ) {
        if( this.size() > MAX ) {
            let normalized = this.normal();
            normalized.scale( MAX );
            this.x = normalized.x;
            this.y = normalized.y;
        };
    };
    
    // Teorema de Pitágoras.
    // Hipotenusa é o tamanho do vetor. X e Y são os catetos.
    this.size = function() {
        return Math.sqrt( (this.x * this.x) + (this.y * this.y) );
    };
    
    // Remover a raíz quadrada ajuda em alguns cálculos.
    this.fastSize = function() {
        return (this.x * this.x) + (this.y * this.y);
    };
    
    // Mantém o vetor com tamanho '1'. 
    this.normal = function() {
        return new Point( (this.x / this.size()), (this.y / this.size()));
    };
    
    this.getAngle = function() {
        return (Math._180PI * Math.atan2( this.y, this.x ));
    };

};
/**
 *  MathHelper.js
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
 *  @brief    Funções matemáticas.
 *  @depends  /physics/Point.js
 */
Math._TWOPI = Math.PI * 2;
Math._180PI = 180 / Math.PI;
Math._PI180 = Math.PI / 180;
Math.randomFixed = function( MAX, DECIMALS ) {
    return (Math.random() * MAX).toFixed( DECIMALS )
};
// Retorna um número aleatório entre um valor mínimo e máximo.
Math.randomBetween = function( MIN, MAX ) {
    return (Math.random() * (MAX - MIN)) + MIN;
};

Math.random0_1 = function() {
    return Math.random() * 2 >> 0;
}

Math.randomInsideCircle = function ( POSITION, RADIUS ) {
    // Vamos criar um vetor a partir de um ângulo e distancia aleatórios.
    let randomAngle = Math.randomFixed( 360, 2 );
    let randomDist = Math.randomFixed( RADIUS, 2 );
    let randomVect = new Point( randomAngle, "angle" );
    randomVect.scale( randomDist );
    // Aogra pegamos o centro do círculo e somamos a ele nosso vetor acima, retornando-o.
    let tempCenter = POSITION.clone();
    tempCenter.sum( randomVect );
    return tempCenter;
};
    
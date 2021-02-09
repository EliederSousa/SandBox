/**
 *  Engine.js
 *  
 *  Copyright (c) 2020, Elieder Sousa
 *  eliedersousa<at>gmail<dot>com
 *  
 *  Distributed under the MIT license. 
 *  See <license.txt> file for details.
 *  
 *  @date     05/02/21
 *  @version  v0.2
 *  
 *  @brief    Funções (não matemáticas) auxiliares, variáveis e constantes usadas nos cálculos.
 *  @depends   Não depende de nenhuma biblioteca.
 *  
 */

Engine = (function() {
    // Variáveis Físicas
    this.groundFriction = .02;
    this.groundNormal   = 1;
    this.hasGravity     = true;    // Gravidade ON/OFF
    this.maxVelocity    = 1024;     // 2^10
    this.author         = 'eliedersousa@gmail.com';
    
    // Gerador de IDs.
    let nextID          = 1;
    let maximumID       = 4294967296;   // 2^32
    
    // Debug
    this.velocityLine   = false;
    this.circularScreen = true;    
    this.debugBox       = true;    
    
    // Métodos públicos.
    return {
        get velocityLine() {
            return velocityLine;
        },
        get circularScreen() {
            return circularScreen;
        },
        get debugBox() {
            return debugBox;
        },
        get maxVelocity() {
            return maxVelocity;
        },
        get hasGravity() {
            return hasGravity;
        },
        generateID : () => {
            if( nextID > maximumID ) {
                nextID = 1;
            } else {
                nextID++;
            }
            return nextID;
        }      
    };
    
})();
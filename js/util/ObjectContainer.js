/**
 *  ObjectContainer.js
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
 *  @brief    Cria um container de objetos.
 *  @depends  Não depende de nenhuma biblioteca.
 */

// Como não há formas de criar propriedades privadas no ES6 de uma forma elegante, melhor deixar desse jeito por enquanto.
ObjectContainer = function () {
    let _objects = [];
    let _deleted = [];
    let _count = 0;

    this.add = function ( WHO ) {
        if ( _deleted.length > 0 ) {
            let id = _deleted.pop();
            _objects[ id ] = WHO;
            _count++;
            return id;
        } else {
            _objects.push( WHO );
            _count++;
            return _objects.length - 1;
        }
    };

    this.del = function ( ID ) {
        if ( _objects[ ID ] ) {
            delete _objects[ ID ];
            _deleted.push( ID );
            _count--;
            if ( _count == 0 ) {
                _deleted = [];
                _objects = [];
            }
            ;
            return _objects.length;
        }
        ;
    };
	
	this.getObject = function( _id ) {
		return _objects[ _id ];
	};
    
    this.getAll = function() {
        return _objects;
    }

    this.getCount = function () {
        return _count;
    };

    this.debug = function () {
        console.info( "---- OBJECTCONTAINER DEBUG ----" );
        console.log( "DELETED: " + _deleted );
        console.log( "OBJECTS: " + _objects );
        console.log( "COUNT  : " + this.getCount() );
        console.log( "-------------------------------" );
    };
};
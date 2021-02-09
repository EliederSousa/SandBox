/**
 *  Timer.js
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
 *  @brief    Manipula contagem de tempo.
 *  @details  Use esta classe e crie um handler útil para manipular e comparar intervalos de tempo.
 *  @depends Não depende de nenhuma biblioteca.
 */

Timer = function () {
    /**
     *  @var Counter; Indica quantas medições foram feitas entre intervalos de tempo.
     *  É zerada toda vez que a função update() for chamada.
     *  
     */
    this.counter = 0;
    this.lastTime = ( new Date() ).getTime();
	
    /**
     *  @brief Reseta o contador para o tempo atual.
     *  @return void  
     *  @details Esta função pode ser chamada quando se deseja resetar o contador interno da classe.
     *  Em uma marcação de tempo, o contador assume o momento (milésimo) atual da chamada da função.
     *  
     */
    this.update = function () {
        this.lastTime = this.now();
        this.counter = 0;
    };
	
    /**
     *  @brief Retorna o momento atual.
     *  @return Int
     *  @details Oferece uma interface simples para pegar o momento atual e usá-lo em contagens de tempo.
     *  
     */
    this.now = function () {
        return ( new Date() ).getTime();
    };
	
    /**
     *  @brief Compara o momento atual com o último momento gravado internamente na classe.
     *  Adiciona 1 ao contador interno, o que torna útil para calcular quantas chamadas a esta
     *  função foram feitas para se chegar em uma quantidade de tempo específica.
     *  @return Int Tempo em milésimos desde a última chamada da função update (ou da criação da classe).
     *  @details Oferece uma interface para realizar a comparação entre dois intervalos de tempo.
     *  Adiciona 1 ao contador interno, o que torna útil para calcular quantas chamadas a esta
     *  função foram feitas para se chegar em uma quantidade de tempo específica.
     *  
     */
    this.compare = function () {
        this.counter++;
        return this.now() - this.lastTime;
    };
};

/*
	// O exemplo a seguir mostra como comparar dois intervalos de tempo.
	SomeClass = function() {
		this.timeHandler = new Timer();
		this.check = function() {
			if( this.timeHandler.compare() > 2000 ) {
				this.timeHandler.update();
				doStuff();				
			}
		}
	}
*/
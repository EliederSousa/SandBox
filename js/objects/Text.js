class Text extends Item {
	constructor( POINT, CONF ) {
        // Eu posso passar um objeto 'cheio' (com todas as propriedades); 
        // A classe Item não usará todas, só as que são comuns para qualquer
        // objeto (posição, rotação, cores).
		let CONFIG = {
			type: "Text",
			text: typeof( CONF ) === "string" ? CONF : CONF.text,
            color: CONF.color ? CONF.color : '#FF888888',
            font:  CONF.font ? CONF.font : '12px Consolas'
		};
		super( POINT, CONFIG );
        
        // Propriedades existentes apenas no objeto Text
		this.text = CONFIG.text;
		this.font = CONFIG.font;
	}
}
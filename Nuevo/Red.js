/**
 * Clase Red.
 * @class
 */

export class Red{
    // red
    #red;
    #tipoRed;
    #redEnBinario;
    #redIngresada
    // mascara
    #mascara;
    #mascaraEnBinario;
    // octeto afectado
    #octetoAfectado;
    // host
    #hostDisponibles;
    // cantidad de bits
    #cantidadBits1;
    #cantidadBits0;
    // Broadcast
    #broadcast;
    // Rango
    #rango;
    // regex
    #customRegex = {
        redIPv4: /^(2[0-2][0-3]|2[0-1][0-9]|1?[0-9]?[0-9])\.((2[0-5][0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.){2}0$/,
        redTipoA: /^([1-9]?[0-9]|1[0-1][0-9]|12[0-7])$/,
        redTipoB: /^(12[89]|1[3-8][0-9]|19[01])$/,
        redTipoC: /^(2[01][0-9]|22[0-3]|19[2-9])$/
    }
    /**
     * Crea una nueva instancia de Red. Por ejemplo, "192.168.0.0".
     * @param {string} red - El valor de red debe ser un string .
     */
    constructor(red){
        this.#redIngresada = red;
        this.#red = red.split(".").map(octeto => parseInt(octeto));

        this.#verificarRed();
        this.calcularMascara();
        this.setOctetoAfectado();
        this.#formatearRed();
        this.setRedEnBinario();
        this.setHostDisponibles();
        this.#setBroadcast();
        this.#setRango();

    }
    #verificarRed(){
        if (!this.#redIngresada) throw new Error("La red es necesaria");
        if (!this.#customRegex.redIPv4.test(this.#redIngresada)) throw new Error(`Red ${this.#redIngresada} no valida`);
        
        let primerOcteto = this.#redIngresada.split(".")[0]
        if (this.#customRegex.redTipoA.test(primerOcteto)){
            this.#tipoRed = "A"
            this.#cantidadBits1 = 8;
            this.#cantidadBits0 = 24;
        }
        else if (this.#customRegex.redTipoB.test(primerOcteto)){
            this.#tipoRed = "B"
            this.#cantidadBits1 = 16;
            this.#cantidadBits0 = 16;
        }
        else if (this.#customRegex.redTipoC.test(primerOcteto)){
            this.#tipoRed = "C"
            this.#cantidadBits1 = 24;
            this.#cantidadBits0 = 8;
        }
    }
    calcularMascara(){
        let mascara = "1".repeat(this.#cantidadBits1) + "0".repeat(this.#cantidadBits0);
        this.#mascaraEnBinario = [
                mascara.substring(0,8),
                mascara.substring(8,16),
                mascara.substring(16,24),
                mascara.substring(24,32)
            ]
        this.#mascara = this.#mascaraEnBinario.map(binario => parseInt(binario, 2));
    }
    setOctetoAfectado(){
        for (let posicionOcteto = 3; posicionOcteto >= 0; posicionOcteto--){
            if (this.#mascaraEnBinario[posicionOcteto].includes("1")) {
                this.#octetoAfectado = posicionOcteto;
                break;
            }
        
        }
    }
    #formatearRed(){
        for (let posicionOcteto = 3; posicionOcteto >= 0; posicionOcteto--){
            if (posicionOcteto > this.#octetoAfectado){
                this.#red[posicionOcteto] = 0;
            }
        }

    }
    setRedEnBinario(){
        this.#redEnBinario = this.#red.map(octeto => octeto.toString(2).padStart(8,"0"));
    }
    setHostDisponibles(){
        this.#hostDisponibles = Math.pow(2, this.#cantidadBits0) - 2;
    }
    #setBroadcast(){
        let red = this.#red.slice();
        for (let posicionOcteto = 3; posicionOcteto > 0; posicionOcteto--){
            if (posicionOcteto > this.#octetoAfectado){
                red[posicionOcteto] = 255;
            }
        }
        this.#broadcast = red;
    }
    #setRango(){
        let limineInferior = this.#red.slice();
        limineInferior[3] = limineInferior[3] + 1;
        let limineSuperior = this.#broadcast.slice();
        limineSuperior[3] -= 1;

        this.#rango = {
            limineInferior,
            limineSuperior
        }
        
    }

    
    getAll(){
        return {
            red: this.#red,
            redIngresada: this.#redIngresada,
            tipoRed: this.#tipoRed,
            redEnBinario: this.#redEnBinario,
            mascara: this.#mascara,
            mascaraEnBinario: this.#mascaraEnBinario,
            octetoAfectado: this.#octetoAfectado,
            hostDisponibles: this.#hostDisponibles,
            cantidadBits1: this.#cantidadBits1,
            cantidadBits0: this.#cantidadBits0,
            broadcast: this.#broadcast,
            rango: this.#rango
        }
    }

    getRed(){
        return this.#red;
    }
    getRedIngresada(){
        return this.#redIngresada;
    }
    getTipoRed(){
        return this.#tipoRed;
    }
    getRedEnBinario(){
        return this.#redEnBinario;
    }
    getMascara(){
        return this.#mascara;
    }
    getMascaraEnBinario(){
        return this.#mascaraEnBinario;
    }
    getOctetoAfectado(){
        return this.#octetoAfectado;
    }
    getHostDisponibles(){
        return this.#hostDisponibles;
    }
    getCantidadBits1(){
        return this.#cantidadBits1;
    }
    getCantidadBits0(){
        return this.#cantidadBits0;
    }
    getBroadcast(){
        return this.#broadcast;
    }
    getRango(){
        return this.#rango;
    }


    setCantidadBits1(cantidadBits1){
        this.#cantidadBits1 = cantidadBits1;
    }
    setCantidadBits0(cantidadBits0){
        this.#cantidadBits0 = cantidadBits0;
    }
    setBroadcast(broadcast){
        this.#broadcast = broadcast;
    }
    setRango(rango){
        this.#rango = rango;
    }
}


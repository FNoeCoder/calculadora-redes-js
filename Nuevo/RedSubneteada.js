import { Red } from "./Red.js";

/**
 * Clase RedSubneteada.
 * @class
 */
export class RedSubneteada{
    #red = [];
    #tipoRed = "";
    #redIngresada = ""
    // mascara
    #mascara = [];
    #mascaraEnBinario = [];
    // octeto afectado
    #octetoAfectado = 0;
    // host
    #hostRequeridos = 0;
    #hostDisponibles = 0;
    
    // subredes
    #subredesDisponibles = 0;
    #subredesRequeridas = 0;
    #saltoDeSubredes = 0;
    // cantidad de bits
    #cantidadBits1 = 0;
    #cantidadBits0 = 0;
    #bitsTomadosParaSubredes = 0;




    /**
     * Crea una nueva instancia de Red. Por ejemplo, "192.168.0.0".
     * @param {string} Red - El valor de red debe ser un string .
     * @param {object} opciones - Las opciones para la red.
     * @param {number} opciones.hostRequeridos - Los host requeridos.
     * @param {number} opciones.subredesRequeridas - La cantidad de subredes.
     * @throws {Error} - Solo se puede poner los host requeridos o la cantidad de subredes, no ambos.
     * @throws {Error} - La red es necesaria.
     */
    constructor(red, {hostRequeridos, subredesRequeridas }){
        if (!red){
            throw new Error("La red es necesaria.");
        }
        if (hostRequeridos && subredesRequeridas){ 
            throw new Error("Solo se puede poner los host requeridos o la cantidad de subredes, no ambos.");
        }
        else if (!hostRequeridos && !subredesRequeridas){
            throw new Error("Se necesita poner los host requeridos o la cantidad de subredes.");
        }
        this.#colocarValoresBase(red);
        if (hostRequeridos){
            this.#hostRequeridos = hostRequeridos;
            this.#ifHostRequeridos();
        }
        else if (subredesRequeridas){
            this.#subredesRequeridas = subredesRequeridas;
            this.#ifSubredesRequeridas();
        }

    }
    #colocarValoresBase(red){
        this.#red = new Red(red);
        this.#tipoRed = this.#red.getTipoRed();
        this.#redIngresada = red;
        this.#mascara = this.#red.getMascara();
        this.#mascaraEnBinario = this.#red.getMascaraEnBinario();
        this.#octetoAfectado = this.#red.getOctetoAfectado();
        this.#cantidadBits1 = this.#red.getCantidadBits1();
        this.#cantidadBits0 = this.#red.getCantidadBits0();
    }
    #ifSubredesRequeridas(){
        // TODO: Falta esto de completar
        this.#calcularHostDisponibles();
        this.#calcularSaltoDeSubredes();
        this.getTodasLasSubredes();

    }

    #ifHostRequeridos(){
        this.#Calcularbits0y1();
        this.#calcularMascaraSubneteada();
        this.#calcularOctetoAfectado();
        this.#calcularSubredesDisponibles();
        this.#calcularHostDisponibles();
        this.#calcularSaltoDeSubredes();
        this.getTodasLasSubredes();
    }
    #Calcularbits0y1(){
        let cantidadHost = this.#hostRequeridos + 2;
        for (let bit = 1; bit < this.#cantidadBits0-1; bit++){
            // console.log(`${cantidadHost} > ${2**bit} && ${cantidadHost} <= ${2**(bit + 1)}`);
            if (cantidadHost > 2**bit && cantidadHost <= 2**(bit + 1)){

                this.#cantidadBits0 = bit+1;
                this.#cantidadBits1 = 32 - this.#cantidadBits0;
                this.#bitsTomadosParaSubredes = this.#cantidadBits1 % 8;
                break;
            }
        }

    }
    #calcularMascaraSubneteada(){
               
        let cantidadBits1 = this.#cantidadBits1;
        let cantidadBits0 = this.#cantidadBits0;
        let mascaraBinariaString = "1".repeat(cantidadBits1) + "0".repeat(cantidadBits0);
        let mascaraBinaria = [
            mascaraBinariaString.slice(0, 8),
            mascaraBinariaString.slice(8, 16),
            mascaraBinariaString.slice(16, 24),
            mascaraBinariaString.slice(24, 32)
        ]; 
        this.#mascaraEnBinario = mascaraBinaria;
        this.#mascara = this.#mascaraEnBinario.map(octeto => parseInt(octeto, 2));
    }
    #calcularOctetoAfectado(){
        for (let octeto = 2; octeto >= 0; octeto--){
            if (this.#mascaraEnBinario[octeto+1].includes("1")){
                this.#octetoAfectado = octeto;
                break;
            }
        }
    }
    #calcularSubredesDisponibles(){
        this.#subredesDisponibles = 2**this.#bitsTomadosParaSubredes;
        this.#subredesRequeridas = this.#subredesDisponibles;
    }
    #calcularHostDisponibles(){
        this.#hostDisponibles = 2**(this.#cantidadBits0) - 2;
    }
    #calcularSaltoDeSubredes(){
        this.#saltoDeSubredes = (2**[this.#cantidadBits0+this.#bitsTomadosParaSubredes]) / this.#subredesDisponibles;

    }
    




    getTodasLasSubredes(){
        let redBase = this.#red.getRed();
        let subredes = [
            {
                red: redBase,
                limineInferior: this.#sumarASubred(1, redBase),
                limineSuperior: this.#sumarASubred(this.#saltoDeSubredes-2, redBase),
                broadcast: this.#sumarASubred(this.#saltoDeSubredes-1, redBase),
            }
        ];
        for (let subredesTotales = 1; subredesTotales < this.#subredesDisponibles; subredesTotales++){
            let ultimaSubred = subredes[subredes.length - 1];

            let nuevaRed = this.#sumarASubred(this.#saltoDeSubredes, ultimaSubred.red);
            let nuevoBroadcast = this.#sumarASubred(this.#saltoDeSubredes, ultimaSubred.broadcast);
            let nuevoRango = {
                limineInferior: this.#sumarASubred(this.#saltoDeSubredes, ultimaSubred.limineInferior),
                limineSuperior: this.#sumarASubred(this.#saltoDeSubredes, ultimaSubred.limineSuperior)
            }
            subredes.push({
                red: nuevaRed,
                broadcast: nuevoBroadcast,
                limineInferior: nuevoRango.limineInferior,
                limineSuperior: nuevoRango.limineSuperior,
            })
        }
        for (let subred of subredes){
            console.log(`Red: ${subred.red.join(".")}  Limite Inferior: ${subred.limineInferior.join(".")}  Limite Superior: ${subred.limineSuperior.join(".")}  Broadcast: ${subred.broadcast.join(".")}`);
        }
        console.log(this.#saltoDeSubredes);
        return subredes;
    }

    #sumarASubred(cantidad, redAntigua){
        let red = redAntigua.slice();
        
        for(let octeto = 3; octeto >= 0; octeto--){
            if (cantidad <= 0){
                break;
            }
            else if (cantidad > 255){
                let cantidadDe255 = Math.floor(cantidad / 256);
                let resto = cantidad % 256;
                red[octeto] += resto;
                cantidad = cantidadDe255;
            }
            else if (cantidad > 0 && cantidad <= 255){
                red[octeto] += cantidad;
                break;
            }
        }
        return red;
    }
    getAll(){
        return {
            red: this.#red.getRed(),
            tipoRed: this.#tipoRed,
            redIngresada: this.#redIngresada,
            mascara: this.#mascara,
            mascaraEnBinario: this.#mascaraEnBinario,
            octetoAfectado: this.#octetoAfectado+1,
            hostRequeridos: this.#hostRequeridos,
            hostDisponibles: this.#hostDisponibles,
            subredesDisponibles: this.#subredesDisponibles,
            subredesRequeridas: this.#subredesRequeridas,
            saltoDeSubredes: this.#saltoDeSubredes,
            cantidadBits1: this.#cantidadBits1,
            cantidadBits0: this.#cantidadBits0       
        }
    }
}
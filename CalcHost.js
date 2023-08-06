const Funciones = require("./functions.js")

class CalcHost{
    constructor(network,host){
        this.network = network.split(".")
        this.hostRequeridos = host 
        this.hostRequeridos = this.hostRequeridos < 2 ? 2 : this.hostRequeridos
        this.bits1 = Funciones.DataNetwork(network).bits1 
        this.bits0 = Funciones.DataNetwork(network).bits0 
        this.host = 2**this.getHostTotales() - 2

        this.type = Funciones.DataNetwork(network).type
        this.bits0 = this.getHostTotales()
        this.bits1 = 32-this.bits0

        this.bits = Funciones.separarBits( "1".repeat(this.bits1) + "0".repeat(this.bits0) )

        this.octetoAfectado = this.setOctetoAfectado()

        this.mascara = Funciones.Mascara(this.bits)
        this.salto = 256 - parseInt( this.mascara.split(".")[this.octetoAfectado-1] )
        this.salto = this.salto >=256 ? 1 : this.salto
        this.networkBits = this.network.join(".") +"/"+this.bits1
        // this.rango = this.rango_especifico(1)
        this.subredesTotales = 256 / this.salto
    }
    getHostTotales(){
        for (let exponente = 1; exponente<=this.bits0; exponente++){
            if (this.hostRequeridos+2 > 2**(exponente-1) && this.hostRequeridos+2 <= 2**exponente){
                return exponente
            }
        }
        return this.bits0
    }
    setOctetoAfectado(){
        for (let octeto=4; octeto>=1;octeto--){
            if ( this.bits[octeto-1].includes("1")){
                return octeto
            }
        }
    }
    getRangos(){
        let rangos = []
        for (let i=0; i<256/this.salto; i++){
            rangos.push(this.rango_especifico(i+1))
        }
        return rangos
    }
    rango_especifico(rango){

        let copiaNetwork = this.network.slice()
        let rangoInferior = parseInt(copiaNetwork[this.octetoAfectado-1]) + this.salto*(rango-1)
        let rangoInferiorList = []

        for (let i=0; i<4; i++){
            if(i === (this.octetoAfectado-1) ){
                rangoInferiorList.push(rangoInferior)
            }
            else if (i < (this.octetoAfectado-1)){
                rangoInferiorList.push(copiaNetwork[i])
            }
            else if (i > (this.octetoAfectado-1)){
                rangoInferiorList.push("0")
            }
        }

        
        let rangoSuperior = parseInt(copiaNetwork[this.octetoAfectado-1]) + (this.salto*rango) -1
        let rangoSuperiorList = []
        for (let i=0; i<4; i++){
            if(i === (this.octetoAfectado-1) ){
                rangoSuperiorList.push(rangoSuperior)
            }
            else if (i < (this.octetoAfectado-1)){
                rangoSuperiorList.push(copiaNetwork[i])
            }
            else if (i > (this.octetoAfectado-1)){
                rangoSuperiorList.push("255")
            }
        }
        return {
            indice: rango,
            inicio: rangoInferiorList.join("."), 
            final: rangoSuperiorList.join(".")
        }
    }
}

module.exports = CalcHost


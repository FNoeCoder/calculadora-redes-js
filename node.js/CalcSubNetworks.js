const Funciones = require("./functions.js")

class CalcSubNetworks{
    constructor(network,subRedes){
        this.network = network.split(".")
        this.subredesTotales = Funciones.RedesTotales(subRedes)
        this.type = Funciones.DataNetwork(network).type
        this.bits1 = Funciones.DataNetwork(network).bits1 + Funciones.bitsSubRedes(subRedes)
        this.bits0 = Funciones.DataNetwork(network).bits0 - Funciones.bitsSubRedes(subRedes)
        this.bits = Funciones.separarBits( "1".repeat(this.bits1) + "0".repeat(this.bits0) )

        this.octetoAfectado = this.setOctetoAfectado()

        this.mascara = Funciones.Mascara(this.bits)
        this.salto = 256 - parseInt( this.mascara.split(".")[this.octetoAfectado-1] )
        this.salto = this.salto >=256 ? 1 : this.salto
        this.networkBits = this.network.join(".") +"/"+this.bits1
        this.host = this.bits[this.octetoAfectado-1].includes("1") ? (2**this.bits0)-2 : -2 + 2**(8 * (4-this.octetoAfectado) )
    }
    setOctetoAfectado(){
        for (let octeto=1; octeto<=4;octeto++){
            if ( this.bits[octeto-1].includes("0") ){
                return octeto
            }
        }
    }

    getRangos(){
        let rangos = []
        for (let i=0; i<this.subredesTotales; i++){
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
module.exports = CalcSubNetworks
// let resul = new CalcSubNetworks("172.16.0.0",10)
// let resul = new CalcSubNetworks("10.0.0.0",130)
// console.log(resul);
// console.log(resul.getRangos());
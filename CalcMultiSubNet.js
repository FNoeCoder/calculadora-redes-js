const Funciones = require("./functions.js")
const CalcHost = require("./CalcHost.js")

class CalcMultiSubNet{
    constructor(network,hosts){
        this.network = network.split(".")
        this.hosts = hosts.sort((a, b) =>  b - a);
        this.networks = hosts.map(host => new CalcHost(this.network.join("."),host))
        this.copiaNetwork = this.network.slice()
        
    }


    getRangos(){
        let rangos = []

        for (let network=0; network < this.networks.length; network++){
            
            rangos.push( this.rango_especifico(this.networks[network].octetoAfectado, this.networks[network].salto) )
            rangos[network].mascara = this.networks[network].mascara
            rangos[network].hostRequeridos = this.hosts[network]
            rangos[network].host = this.networks[network].host

        }
        return rangos
    }
    rango_especifico(octetoAfectado, salto){
        
        let rangoInferior = (parseInt(this.copiaNetwork[octetoAfectado-1]) ) +""
        
        let rangoInferiorList = []
        for (let i=0; i<4; i++){
            if(i === (octetoAfectado-1) ){
                rangoInferiorList.push(rangoInferior)
            }
            else if (i < (octetoAfectado-1)){
                rangoInferiorList.push(this.copiaNetwork[i])
            }
            else if (i > (octetoAfectado-1)){
                rangoInferiorList.push("0")
            }
        }
        


        let rangoSuperior = (parseInt(this.copiaNetwork[octetoAfectado-1]) + salto -1 ) + ""
        let rangoSuperiorList = []
        for (let i=0; i<4; i++){
            if(i === (octetoAfectado-1) ){
                rangoSuperiorList.push(rangoSuperior)
            }
            else if (i < (octetoAfectado-1)){
                rangoSuperiorList.push(this.copiaNetwork[i])
            }
            else if (i > (octetoAfectado-1)){
                rangoSuperiorList.push("255")
            }
        }
        
        let newRangoIngerior = rangoInferiorList.slice()
        newRangoIngerior[octetoAfectado-1] = (parseInt(rangoInferiorList[octetoAfectado-1]) + salto).toString()
        this.copiaNetwork = newRangoIngerior
        console.log(`${rangoInferiorList} -----  ${rangoSuperiorList}`);


        return {

            inicio: rangoInferiorList.join("."), 
            final: rangoSuperiorList.join(".")
            
        }
    }

}
module.exports = CalcMultiSubNet


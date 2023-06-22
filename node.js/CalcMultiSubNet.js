const Funciones = require("./functions.js")
const CalcHost = require("./CalcHost.js")

class CalcMultiSubNet{
    constructor(network,hosts){
        this.network = network.split(".")
        this.hosts = hosts.sort((a, b) =>  b - a);
        this.networks = hosts.map(host => new CalcHost(this.network.join("."),host))
        
    }


    putSumandos(){
        let sumado = 0
        let sumandos = []
        for (let resul of this.networks){
            
            sumado += resul.salto
            sumandos.push(sumado)
        }
        return sumandos
    }
    getRangos(){
        let rangos = []
        let sumandos = this.putSumandos()
        for (let network=0; network < this.networks.length; network++){
            
            rangos.push( this.rango_especifico(this.networks[network].octetoAfectado, this.networks[network].salto, sumandos[network]) )
            rangos[network].mascara = this.networks[network].mascara
            rangos[network].hostRequeridos = this.hosts[network]
            rangos[network].host = this.networks[network].host

        }
        return rangos
    }
    rango_especifico(octetoAfectado, salto, sumado){
        let copiaNetwork = this.network.slice()
        let rangoInferior = (parseInt(copiaNetwork[octetoAfectado-1]) - salto + sumado) +""
        
        let rangoInferiorList = []
        for (let i=0; i<4; i++){
            if(i === (octetoAfectado-1) ){
                rangoInferiorList.push(rangoInferior)
            }
            else if (i < (octetoAfectado-1)){
                rangoInferiorList.push(copiaNetwork[i])
            }
            else if (i > (octetoAfectado-1)){
                rangoInferiorList.push("0")
            }
        }
        

        
        let rangoSuperior = (parseInt(copiaNetwork[octetoAfectado-1]) + sumado-1) + ""
        let rangoSuperiorList = []
        for (let i=0; i<4; i++){
            if(i === (octetoAfectado-1) ){
                rangoSuperiorList.push(rangoSuperior)
            }
            else if (i < (octetoAfectado-1)){
                rangoSuperiorList.push(copiaNetwork[i])
            }
            else if (i > (octetoAfectado-1)){
                rangoSuperiorList.push("255")
            }
        }
        return {

            inicio: rangoInferiorList.join("."), 
            final: rangoSuperiorList.join(".")
            
        }
    }

}
module.exports = CalcMultiSubNet
// let resul = new CalcMultiSubNet("172.16.0.0",[1000, 800, 3000, 10000])
// let resul = new CalcMultiSubNet("10.0.0.0",500)
// console.log(resul);
// console.log(resul.getRangos());

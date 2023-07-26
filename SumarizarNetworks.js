const Funciones = require("./functions.js")

class SumarizarNetworks{
    constructor(networks){
        this.networks = networks
        this.networksBinary = this.putnetworksBinary()
        this.newMask;
        
    }
    putnetworksBinary(){
        let data = []
        for (let network of this.networks){
            let binario = Funciones.NetworkBinary(network)
            data.push(
                binario, 
            )
        }
        return data
    }
    getNewNetwork(){
        return Funciones.BinaryMask(this.getNewNetworkBinary())
    }
    getNewNetworkBinary(){
        let newNetwork = ""

        for (let caracter=0; caracter<35; caracter++){
            newNetwork += this.CompuertaAndColum(caracter)
        }
        return newNetwork
    }
    CompuertaAndColum(nCaracter){
        for (let nBinary=0; nBinary<this.networksBinary.length; nBinary++){
            if (this.networksBinary[nBinary][nCaracter] === "0"){
                return "0"
            }
        }
        return this.networksBinary[0][nCaracter]
    }
    getNewMask(){
        
        return Funciones.BinaryMask(this.getNewNewMaskBinary())
    }
    getNewNewMaskBinary(){
        let newMask = ""

        for (let caracter=0; caracter<32; caracter++){
            let letra = this.catacterIgual(caracter)
            if (letra === "0"){break}
            newMask += letra
        }
        newMask = newMask + "0".repeat(32 - newMask.length)
        
        return Funciones.separarBits(newMask).join(".")
    }
    catacterIgual(nCaracter){
        let newNetworkBinary = this.networksBinary.slice().map(binario => binario.split(".").join(""))
        let caracter = "1"
        for (let nBinary=0; nBinary<newNetworkBinary.length-1; nBinary++){
            if (newNetworkBinary[nBinary][nCaracter] !== newNetworkBinary[nBinary+1][nCaracter]){
                caracter = "0"
            }
        }
        return caracter 
        
    }


}

module.exports = SumarizarNetworks

// let resul = new SumarizarNetworks([
//     "172.16.0.0",
//     "172.17.0.0",
//     "172.28.0.0",
//     "172.60.0.0"
// ])
// console.log(resul);

// console.log(resul.getNewNewMaskBinary());
// console.log(resul.getNewMask());

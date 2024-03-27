const RedSubneteada = require("./RedSubneteada.js")

class RedMultiSubneteada{
    constructor(red, hostRequeridos){
        this.red = red.split(".")
        this.hostRequeridos = hostRequeridos.sort((a, b) =>  b - a);
        this.redesSubneteadas = hostRequeridos.map(hostRequedido => new RedSubneteada(red,{host: hostRequedido}))
        // this.red[this.redesSubneteadas[0].octetoAfectado] = "0"
        this.redCopia = this.red.slice()
    }

    ObtenerRangos(){
        let rangos = []
        const CANTIDAD_REDES = this.redesSubneteadas.length

        for (let red=0; red < CANTIDAD_REDES; red++){
            let informacionRed = {}
            let rangosRed = this.ObtenerRangoEspecifico(this.redesSubneteadas[red].octetoAfectado, this.redesSubneteadas[red].salto, red) 
            let redBinaria = rangosRed.inicio.split(".").map(octeto => {
                let binario = parseInt(octeto).toString(2)

                return "0".repeat( 8 - binario.length) + binario
            })

            informacionRed.inicio = rangosRed.inicio
            informacionRed.final = rangosRed.final
            informacionRed.salto = this.redesSubneteadas[red].salto
            informacionRed.bits0 = this.redesSubneteadas[red].cantidadBits0
            informacionRed.bits1 = this.redesSubneteadas[red].cantidadBits1
            informacionRed.redBinaria = redBinaria.join(".")
            informacionRed.notacionCIDR = `${rangosRed.inicio}/${this.redesSubneteadas[red].cantidadBits1}`
            informacionRed.hostRequeridos = this.redesSubneteadas[red].hostRequeridos
            informacionRed.host = this.redesSubneteadas[red].host
            informacionRed.mascara = this.redesSubneteadas[red].mascara.join(".")
            informacionRed.mascaraBinaia = this.redesSubneteadas[red].mascaraBinaria.join(".")

            rangos.push( informacionRed )
        }
        return rangos
    }
    ObtenerRangoEspecifico(octetoAfectado, salto, numeroRed){
        // if (numeroRed === 0 && this.redCopia[octetoAfectado] !== "0" ){
            
        // }
        let listaRangoInferior = this.redCopia.map((octetoActual, octetoActualIndex) => {

            
            if (octetoAfectado === octetoActualIndex) {
                octetoActual = parseInt(octetoActual)
            }else if (octetoAfectado < octetoActualIndex){
                octetoActual = "0"
            }
            // else if (salto > this.red[octetoAfectado])
            return octetoActual
        })

        let listaRangoSuperior = this.redCopia.map((octeto, i) => {
            if (octetoAfectado === i) {
                octeto = parseInt(octeto) + salto -1
            }else if (octetoAfectado < i){
                octeto = "255"
            }
            return octeto
            
        })

        this.redCopia = this.redCopia.map((octeto, i) => {
            if (octetoAfectado === i) {
                octeto = parseInt(octeto) + salto
            }else if (this.octetoAfectado < i){
                octeto = "0"
            }
            return octeto
        })
        return {
            inicio: listaRangoInferior.join("."),
            final: listaRangoSuperior.join(".")
        }
    }
}

let resul = new RedMultiSubneteada("10.10.10.0", [700,200,500,500,50,100,320,800,1100,1050])
// let resul = new RedMultiSubneteada("172.168.1.0", [16000, 500, 200, 200, 200])
// let resul = new RedMultiSubneteada("10.10.10.0", [16384, 8192, 8]) //
console.log(resul); //
console.log(resul.ObtenerRangos()); //
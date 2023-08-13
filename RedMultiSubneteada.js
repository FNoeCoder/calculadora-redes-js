const RedSubneteada = require("./RedSubneteada.js")

class RedMultiSubneteada{
    constructor(red, hostRequeridos){
        this.red = red.split(".")
        this.hostRequeridos = hostRequeridos.sort((a, b) =>  b - a);
        this.redesSubneteadas = hostRequeridos.map(hostRequedido => new RedSubneteada(red,hostRequedido))
        this.red[this.redesSubneteadas[0].octetoAfectado] = "0"
        this.redCopia = this.red.slice()
    }

    ObtenerRangos(){
        let rangos = []
        const CANTIDAD_REDES = this.redesSubneteadas.length

        for (let red=0; red < CANTIDAD_REDES; red++){
            let informacionRed = {}
            let rangosRed = this.ObtenerRangoEspecifico(this.redesSubneteadas[red].octetoAfectado, this.redesSubneteadas[red].salto) 
            let redBinaria = rangosRed.inicio.split(".").map(octeto => {
                let binario = parseInt(octeto).toString(2)

                return "0".repeat( 8 - binario.length) + binario
            })

            informacionRed.inicio = rangosRed.inicio
            informacionRed.final = rangosRed.final
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
    ObtenerRangoEspecifico(octetoAfectado, salto){
        let listaRangoInferior = this.redCopia.map((octetoActual, octetoActualIndex) => {
            
            if (octetoAfectado === octetoActualIndex) {
                octetoActual = parseInt(octetoActual)
            }else if (this.octetoAfectado < octetoActualIndex){
                octetoActual = "0"
            }
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

// let resul = new RedMultiSubneteada("10.10.10.0", [700,200,500,500,50,100,320,800,1100,1050])
// let resul = new RedMultiSubneteada("172.168.1.0", [16000, 500, 200, 200, 200])
// console.log(resul);
// console.log(resul.ObtenerRangos());
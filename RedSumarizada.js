const Red = require("./Red.js")

class RedSumarizada{
    constructor(redes){
        this.redes = redes
        this.redesEnBinario;

        this.cantidadBits1;
        this.cantidadBits0;

        this.mascaraNueva;
        this.mascaraBinariaNueva;
        this.redNuevaBinaria;
        this.redNueva;
        this.octetoAfectado;
        this.host
        this.calcularRedesEnBinario();
        this.calcularBitsNuevaMascara()
        this.formatearMascara();
        this.calcularNuevaRed()
        this.calcularOctetoAfectado()
    }
    calcularRedesEnBinario(){
        this.redesEnBinario = this.redes.map((red, i) =>{
            return new Red(red).redBinaria
        })
    }
    calcularBitsNuevaMascara(){
        const BITS_TOTALES = 32;
        let diagonal = 0;
        for (let bit = 0; bit < BITS_TOTALES; bit++){
            if (!this.verificarBitsIgualesColumna(bit)) break;
            diagonal++;        
        }
        this.cantidadBits1 = diagonal
        this.cantidadBits0 = 32 - diagonal
    }
    verificarBitsIgualesColumna(posicionBit){
        let redesEnBinarioCopia = this.redesEnBinario.map(redBinaria=>{
            return redBinaria.join("")
        })
        const NUMERO_REDES = this.redesEnBinario.length

        let bitsIguales = false;

        for (let numeroRed = 1; numeroRed < NUMERO_REDES; numeroRed++ ){
            if (redesEnBinarioCopia[numeroRed -1][posicionBit] == redesEnBinarioCopia[numeroRed][posicionBit]){
                bitsIguales = true
            }else{
                bitsIguales = false
                break
            }
        }
        return bitsIguales
    }
    formatearMascara(){
        let bitsCompletos = "1".repeat(this.cantidadBits1) + "0".repeat(this.cantidadBits0)
        this.mascaraBinariaNueva = [
            bitsCompletos.substring(0,8),
            bitsCompletos.substring(8,16),
            bitsCompletos.substring(16,24),
            bitsCompletos.substring(24,32)
        ]

        this.mascaraNueva = this.mascaraBinariaNueva.map(octeto =>{
            return parseInt(octeto,2).toString()
        })
    }
    calcularNuevaRed(){
        let red1 = this.redesEnBinario[0].join("")
        let bitsIguales = red1.substring(0,this.cantidadBits1)
        let redNueva = bitsIguales + "0".repeat(bitsIguales.length)
        this.redNuevaBinaria = [
            redNueva.substring(0,8),
            redNueva.substring(8,16),
            redNueva.substring(16,24),
            redNueva.substring(24,32)
        ]

        this.redNueva = this.redNuevaBinaria.map(octeto =>{
            return parseInt(octeto,2).toString()
        })

        this.host = (2**this.cantidadBits0)-2
    }
    calcularOctetoAfectado(){
        if (this.cantidadBits1 > 8 && this.cantidadBits1 <= 16) {
            this.octetoAfectado = 1;
        }
        else if(this.cantidadBits1 > 16 && this.cantidadBits1 <= 24) {
            this.octetoAfectado = 2;
        }
        else if(this.cantidadBits1 > 24 && this.cantidadBits1 <= 30) {
            this.octetoAfectado = 3;
        }
    }
    obtenerRango(){
        let final = this.redNueva.map((octeto, i) => {
            if (this.octetoAfectado === i) {
                octeto = parseInt(octeto) + (256 - parseInt(this.mascaraNueva[i])) - 1
            }else if (this.octetoAfectado < i){
                octeto = "255"
            }
            return octeto
        })

        return {
            inicio: this.redNueva.join("."),
            final: final.join(".")
        }
        
    }
}

// let resul = new RedSumarizada(
//     [
//         "10.56.248.0",
//         "10.56.249.0",
//         "10.56.250.0"
//     ]);

// console.log(resul);
// console.log(resul.obtenerRango());

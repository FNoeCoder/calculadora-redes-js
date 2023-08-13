const ErrorNoNetwork = require("./Errores.js").ErrorNoNetwork

class Red {
    constructor(red) {
        this.customRegex = {
            redIPv4: /^(2[0-2][0-3]|2[0-1][0-9]|1?[0-9]?[0-9])\.((2[0-5][0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.){2}0$/,
            redTipoA: /^([1-9]?[0-9]|1[0-1][0-9]|12[0-7])$/,
            redTipoB: /^(12[89]|1[3-8][0-9]|19[01])$/,
            redTipoC: /^(2[01][0-9]|22[0-3]|19[2-9])$/
        }
        this.red = red;
        if (!this.red) throw new ErrorNoNetwork("La red es necesaria");
        if (!this.customRegex.redIPv4.test(this.red)) throw new ErrorNoNetwork(`Red ${this.red} no valida`);
        
        
        this.tipoRed;
        this.cantidadBits0;
        this.cantidadBits1;
        this.host;

        this.redBinaria;
        this.octetoAfectado;
        this.redBinaria;
        this.mascara;
        this.mascaraBinaria;
        this.averiguarDatosRed();
        this.colocarDatos()
    }
    colocarDatos(){
        
        this.calcularDatosMascara();
        this.encontrarOctetoAfectado()
        this.calcularRedBinaria();
        this.calcularHost();
    }
    averiguarDatosRed(){
        let primerOcteto = this.red.split(".")[0]
        if (this.customRegex.redTipoA.test(primerOcteto)){
            this.tipoRed = "A"
            this.cantidadBits1 = 8;
            this.cantidadBits0 = 24;
        }
        else if (this.customRegex.redTipoB.test(primerOcteto)){
            this.tipoRed = "B"
            this.cantidadBits1 = 16;
            this.cantidadBits0 = 16;
        }
        else if (this.customRegex.redTipoC.test(primerOcteto)){
            this.tipoRed = "C"
            this.cantidadBits1 = 24;
            this.cantidadBits0 = 8;
        }
    }
    calcularDatosMascara(){
        let mascara = "1".repeat(this.cantidadBits1) + "0".repeat(this.cantidadBits0);
        this.mascaraBinaria = [
                mascara.substring(0,8),
                mascara.substring(8,16),
                mascara.substring(16,24),
                mascara.substring(24,32)
            ]
        this.mascara = this.mascaraBinaria.map(octetoBinario =>{
            return parseInt(octetoBinario,2).toString();
        })

    }
    encontrarOctetoAfectado(){
        for (let octeto=3; octeto>=0;octeto--){
            if ( this.mascaraBinaria[octeto].includes("1")){
                this.octetoAfectado = octeto
                break
            }
        }
    }
    calcularRedBinaria(){
        this.redBinaria = this.red.split(".").map(octeto =>{
            let octetoBinario = parseInt(octeto).toString(2);
            const LONGITUD_OCTETO = 8;
            return "0".repeat(LONGITUD_OCTETO - octetoBinario.length) +  octetoBinario  
        })
    }
    calcularHost(){
        this.host = (2**this.cantidadBits0)-2;
    }
}
module.exports = Red;



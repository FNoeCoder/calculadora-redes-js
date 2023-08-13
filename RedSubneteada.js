const Red = require("./Red.js");
const ErrorNoHostOSubredes = require("./Errores.js").ErrorNoHostOSubredes
const ErrorHostFueraRango = require("./Errores.js").ErrorHostFueraRango
const ErrorSubredesFueraRango = require("./Errores.js").ErrorSubredesFueraRango


class RedSubneteada extends Red{
    constructor(red,hostOSubredes){
        super(red);
        this.hostRequeridos;
        this.subredesRequeridas;
        this.cantidadSubredes;

        if (!hostOSubredes){
            throw new ErrorNoHostOSubredes("No se ingresarón cantidad de hots o de subredes")
        }
        else if (hostOSubredes.host && !hostOSubredes.subredes) {
            this.hostRequeridos = hostOSubredes.host;
            this.cantidadBits0 = this.calcularBitsRed();
            this.cantidadBits1 = 32 - this.cantidadBits0;


            this.colocarDatos();
            this.salto = 256 - parseInt( this.mascara[this.octetoAfectado] )
            this.cantidadSubredes = 256/this.salto
            this.subredesRequeridas = this.cantidadSubredes            
        }
        else if (!hostOSubredes.host && hostOSubredes.subredes){
            this.subredesRequeridas = hostOSubredes.subredes
            this.cantidadSubredes = 2**this.calcularBitsRedSubred();

            this.salto  = 256/this.cantidadSubredes;
            this.cantidadBits0 = this.cantidadBits0 - this.calcularBitsRedSubred();
            this.cantidadBits1 = 32 - this.cantidadBits0;


            this.colocarDatos();
            this.hostRequeridos = this.host;
        }else {
            throw new ErrorNoHostOSubredes("No se ingresarón cantidad de hots o de subredes")
        }

    }
    calcularBitsRed(){
        for (let exponente = 2; exponente<=this.cantidadBits0; exponente++){
            if (this.hostRequeridos+2 > 2**(exponente-1) && this.hostRequeridos+2 <= 2**exponente){
                return exponente
            }
        }
        throw new ErrorHostFueraRango(`Host fuera de rango. Host maximos: ${this.host}`)
    }
    calcularBitsRedSubred(){
        for (let exponente = 2; exponente<=this.cantidadBits0; exponente++){
            if (this.subredesRequeridas > 2**(exponente-1) && this.subredesRequeridas <= 2**exponente){
                return exponente
            }
        }
        throw new ErrorSubredesFueraRango(`Subredes fuera de rango. Subredes maximas: ${this.cantidadSubredes}`)
    }
    obtenerRangos(){
        let rangos = [];
        for (let cantidadSubredes = 0; cantidadSubredes < (this.cantidadSubredes); cantidadSubredes++){
            rangos.push(this.obtenerRangoEspecifico(cantidadSubredes));
        }
        return rangos
    }
    obtenerRangoEspecifico(cantidadSubredes){
        let octetosRed = this.red.split(".")
        let rangoInferior = 0 + this.salto*(cantidadSubredes)
        let rangoInferiorList = []

        for (let i=0; i<=3; i++){
            if(i === (this.octetoAfectado) ){
                rangoInferiorList.push(rangoInferior)
            }
            else if (i < (this.octetoAfectado)){
                rangoInferiorList.push(octetosRed[i])
            }
            else if (i > (this.octetoAfectado)){
                rangoInferiorList.push("0")
            }
        }
        // let rangoSuperior = parseInt(octetosRed[this.octetoAfectado]) + (this.salto*(cantidadSubredes+1)) - 1
        let rangoSuperior = 0 + (this.salto*(cantidadSubredes+1)) - 1
        let rangoSuperiorList = []
        for (let i=0; i<=3; i++){
            if(i === (this.octetoAfectado) ){
                rangoSuperiorList.push(rangoSuperior)
            }
            else if (i < (this.octetoAfectado)){
                rangoSuperiorList.push(octetosRed[i])
            }
            else if (i > (this.octetoAfectado)){
                rangoSuperiorList.push("255")
            }
        }    
        return{
            inicio: rangoInferiorList.join("."), 
            final: rangoSuperiorList.join(".")
        }
    }
}

module.exports = RedSubneteada;


// let resul = new RedSubneteada("10.168.1.0", {host : 16000})
// let resul = new RedSubneteada("200.168.1.0", {host : 5})
let resul = new RedSubneteada("172.168.1.0", {subredes: 5})

console.log(resul);
console.log(resul.obtenerRangos());

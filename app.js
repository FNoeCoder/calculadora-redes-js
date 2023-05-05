class SubRedes {
    constructor(red, octetos, n_subredes) {
        this.red = red;
        this.octetos = octetos;
        this.n_subredes = n_subredes;
        this.Redes = [0,2,4,8,16,32,64,128,256];
        this.num_unos = this.putNUnos();
        this.total_subredes = this.Redes[this.num_unos]
        this.num_ceros = this.putNCeros();
        this.binario = "1".repeat(this.num_unos) + "0".repeat(this.num_ceros);
        this.cadena_bits_Array = this.putCadenaBitsArray()
        this.cadena_bits= this.putCadenaBits(this.cadena_bits_Array);
        this.decimal = this.putDecimal();
        this.salto = 256 - this.decimal;
        this.red_separada= this.red.split(".")
        this.rangos= [];
        this.generar_rangos();
    }

    putNUnos(){
        for (let i=0; i < this.Redes.length-1; i++){
            if (this.Redes[i] < this.n_subredes && this.n_subredes <= this.Redes[i+1]){
                return i+1
            }
        }
        return 0
    }
    putNCeros(){
        return  8 - this.num_unos
    }
    putCadenaBitsArray(){
        let cadena_bits=[];
        let vueltas = 0;
        for (let i=1; i<=this.octetos; i++){
            cadena_bits.push("11111111")
            vueltas++
        }
        
        cadena_bits.push("1".repeat(this.num_unos) + "0".repeat(this.num_ceros)) 
        vueltas++

        for (let i=vueltas; i<4; i++){
            cadena_bits.push("00000000")
        }
        return cadena_bits;
    }
    putCadenaBits(cadena_bits_Array){
        return cadena_bits_Array.join(".");
    }
    putDecimal(){
        return parseInt(this.cadena_bits_Array[this.octetos],2)
    }

    generar_rangos(){
        for (let i=0; i<this.total_subredes; i++){
            this.rangos.push(this.devolver_rango_especifico(i+1))
        }
        ;
    }

    devolver_rango_especifico(rango){
        let octeto_modificado = this.red_separada.slice(0, this.octetos)
        octeto_modificado.push( this.salto * (rango-1)  .toString())
        for (let i=octeto_modificado.length; i<4; i++){
            octeto_modificado.push("0")
        }
        let octeto_modificado_final = this.red_separada.slice(0, this.octetos)
        octeto_modificado_final.push(  ((this.salto*rango) -1).toString())
        for (let i=octeto_modificado_final.length; i<4; i++){
            octeto_modificado_final.push("255")
        }

        return {
            indice: rango,
            inicio: octeto_modificado.join("."), 
            final: octeto_modificado_final.join(".")
        }
    }

}



function contenido(red2, octetos, subredes){
    let redout = new SubRedes(red2, octetos, subredes)
    tabla_contenido = ``
    redout.rangos.forEach(fila => {
        tabla_contenido+= `
            <tr>
                <td>${fila.indice}</td>
                <td>${fila.inicio}</td>
                <td>${fila.final}</td>
            </tr>
            `
    });
    

    return tabla_contenido
}

let datos_tabla = document.getElementsByTagName("tbody")[0]
let red = document.getElementById("red")
let octetos = document.getElementById("octetos")
let num_subredes = document.getElementById("subredes")
let calcular = document.getElementById("calcular")

console.log(num_subredes);

calcular.addEventListener("click", () =>{
    datos_tabla.innerHTML = contenido(red.value, parseInt(octetos.value), parseInt(num_subredes.value))
    console.log(contenido(red.value, parseInt(octetos.value), parseInt(num_subredes.value)));
})








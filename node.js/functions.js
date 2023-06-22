function NetworkValid(network){

    let NOctetos = network.split(".").length
    if ( NOctetos === 4){
        let octetos = network.split(".")
        let octect1 = parseInt( octetos[0] )
        let octect2 = parseInt( octetos[1] )
        let octect3 = parseInt( octetos[2] )
        let octect4 = parseInt( octetos[3] )
        if (octect1 < 0 || octect1 > 255){
            return false
        }
        else if (octect2 < 0 || octect2 > 255){
            return false
        }
        else if (octect3 < 0 || octect3 > 255){
            return false
        }
        else if(octect4 !== 0){
            return false
        }else{ 
            return true 
        }
    }
    else{
        return false
    }
}





function DataNetwork(network){


    if( NetworkValid(network) ){
        let octetos = network.split(".")
        let octect1 = parseInt( octetos[0])


        if (octect1 >= 0 && octect1 <= 127){
            return {
                type: "A",
                bits1 : 8,
                bits0 : 24
            }
        }
        else if (octect1 >= 128 && octect1 <= 191){
            return {
                type: "B",
                bits1 : 16,
                bits0 : 16
            }
        }
        else if (octect1 >= 192 && octect1 <= 223){
            return {
                type: "C",
                bits1 : 24,
                bits0 : 8
            }
        }
        else{ return null }
    }
    else{ return null }
}

function bitsSubRedes (subRedes){
    const bitsRango = [0,2,4,8,16,32,64,128,256];

    for (let i=0; i < bitsRango.length-1; i++){
        if (bitsRango[i] < subRedes && subRedes <= bitsRango[i+1]){
            return i+1
        }
    }
}
function RedesTotales(subRedes){
    const bitsRango = [0,2,4,8,16,32,64,128,256];

    for (let i=0; i < bitsRango.length-1; i++){
        if (bitsRango[i] < subRedes && subRedes <= bitsRango[i+1]){
            return bitsRango[i+1]
        }
    }
}


function separarBits (cadenaBits){
    return [
        cadenaBits.substring(0,8),
        cadenaBits.substring(8,16),
        cadenaBits.substring(16,24),
        cadenaBits.substring(24,32)
    ]
}

function Mascara(bits){
    let mascara = [];
    for (let octeto of bits){
        mascara.push( parseInt(octeto,2) )
    }
    return mascara.join(".")
}
function NetworkBinary(network){
    let networkSplit = network.split(".")
    let networkBinary = []
    for (let octeto of networkSplit){
        let binary = parseInt(octeto).toString(2)
        binary = binary.length !== 8 ? "0".repeat(8 - binary.length) + binary : binary
        networkBinary.push(binary)
    }
    return networkBinary.join(".")
}
function BinaryMask(binary){
    let binaryMask = binary.split(".")
    let newMask = []
    for (let octeto of binaryMask){
        let binary = parseInt(octeto,2)
        newMask.push(binary)
    }
    return newMask.join(".")
}

module.exports.BinaryMask = BinaryMask
module.exports.DataNetwork = DataNetwork
module.exports.bitsSubRedes = bitsSubRedes
module.exports.separarBits = separarBits
module.exports.Mascara = Mascara
module.exports.RedesTotales = RedesTotales
module.exports.NetworkBinary = NetworkBinary

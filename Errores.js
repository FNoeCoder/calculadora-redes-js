class ErrorNoNetwork extends Error{
    constructor(mensaje){
        super(mensaje);
        this.name = "ErrorNoNetwork";
    }
}
class ErrorNoHostOSubredes extends Error{
    constructor(mensaje){
        super(mensaje);
        this.name = "ErrorNoHostOSubredes";
    }
}
class ErrorHostFueraRango extends Error{
    constructor(mensaje){
        super(mensaje);
        this.name = "ErrorHostFueraRango";
    }
}
class ErrorSubredesFueraRango extends Error{
    constructor(mensaje){
        super(mensaje);
        this.name = "ErrorSubredesFueraRango";
    }
}
class ErrorExesoSubredes extends Error{
    constructor(mensaje){
        super(mensaje);
        this.name = "ErrorExesoSubredes";
    }
}



module.exports.ErrorNoNetwork = ErrorNoNetwork
module.exports.ErrorNoHostOSubredes = ErrorNoHostOSubredes
module.exports.ErrorHostFueraRango = ErrorHostFueraRango
module.exports.ErrorSubredesFueraRango = ErrorSubredesFueraRango
module.exports.ErrorExesoSubredes = ErrorExesoSubredes
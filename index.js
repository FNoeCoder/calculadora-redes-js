const CalcSubNetworks = require("./CalcSubNetworks.js")
const CalcMultiSubNet = require("./CalcMultiSubNet.js")
const SumarizarNetworks = require("./SumarizarNetworks.js")
const CalcHost = require("./CalcHost.js")


function CalcNet(red,Object){
    if ( Object.host ){
        let resul = new CalcHost(red, Object.host) 
        console.log( resul );
        console.log(resul.getRangos());
    }
    else if (Object.Nsubredes){
        let resul = new CalcSubNetworks(red,Object.Nsubredes)
        console.log( resul );
        console.log( resul.getRangos() );
    }
    else if (Object.multisubnet){
        let resul = new CalcMultiSubNet(red, Object.multisubnet)
        console.log( resul );
        console.log( resul.getRangos() );
    }
    else if (Object.sumarizar){
        let resul = new SumarizarNetworks(Object.sumarizar )
        console.log( resul );
        console.log( resul.getNewMask() );
        console.log( resul.getNewNewMaskBinary() );

        console.log( resul.getNewNetwork() );
        console.log( resul.getNewNetworkBinary() );
    }
}


CalcNet("10.10.10.0",{ multisubnet: [700,200,500,500,50,100,320,800,1100, 1050] })


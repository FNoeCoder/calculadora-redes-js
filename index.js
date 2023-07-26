const CalcSubNetworks = require("./CalcSubNetworks.js")
const CalcMultiSubNet = require("./CalcMultiSubNet.js")
const SumarizarNetworks = require("./SumarizarNetworks.js")
const CalcHost = require("./CalcHost.js")

// let network = "150.10.0.0"
// let NHost = 5_000
// let NSubredes = 2
// let hostSubnetear = [15000,8000,5000,2400,600]
// let redesSumarizar =  [ '172.16.0.0', '172.17.0.0', '172.28.0.0', '172.60.0.0' ]
// let redesSumarizar =  [ '172.16.0.0', '172.17.0.0', '172.28.0.0']
// let redesSumarizar =  [ "172.16.0.0", "172.20.0.0"]

// CalcNet(network,{ host: NHost })
// CalcNet(network,{ Nsubredes: NSubredes })
// CalcNet(network,{ multisubnet: hostSubnetear })
// CalcNet(network,{ sumarizar: redesSumarizar })

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
// CalcNet("192.168.0.0",{ host: 2 })
// CalcNet("10.10.40.0",{ multisubnet: [200, 100, 50] })
// CalcNet("150.10.0.0",{ multisubnet: [15000,8000,5000,2400,600] })
// CalcNet("192.168.1.0",{ host: 2 })

import { RedSubneteada } from "./RedSubneteada.js";
import { Red } from "./Red.js";

// let resul = new RedSubneteada("10.10.0.0", {subredesRequeridas: 130});
// // let resul = new RedSubneteada("10.10.0.0", {hostRequeridos: 62});
// console.log(resul.getAll());
// console.log(resul.getTodasLasSubredes());


let iPsPrueba = [
    {ip: "10.10.0.0", subredesRequeridas: 1000, hostRequeridos: 25},
    {ip: "192.168.0.0", subredesRequeridas: 3, hostRequeridos: 25},
    {ip: "172.16.0.0", subredesRequeridas: 4, hostRequeridos: 25}
]

for (let datos of iPsPrueba){
    let red = new RedSubneteada(datos.ip, {hostRequeridos: datos.hostRequeridos});
    let todo = red.getAll();
    // console.log(todo);
//     let Subredes = red.getTodasLasSubredes();

//     // console.log(`Red: ${todo.red.join(".")}  Mascara: ${todo.mascara.join(".")}  Rango: ${todo.rango.limineInferior.join(".")} - ${todo.rango.limineSuperior.join(".")}  Broadcast: ${todo.broadcast.join(".")}`);

//     console.log(`Salgo: ${todo.saltoDeSubredes}  Subredes: ${todo.subredesDisponibles}  Host: ${todo.hostDisponibles}`);
//     for (let datos of Subredes){
//         let limineInferior = datos.limineInferior.join(".");
//         let limineSuperior = datos.limineSuperior.join(".");
//         let red = datos.red.join(".");
//         let broadcast = datos.broadcast.join(".");
//         console.log(`${limineInferior} - ${limineSuperior}     |     Red: ${red}  Broadcast: ${broadcast}`);
//     }


    console.log("\n".repeat(2));

//     // console.log(red.getTodasLasSubredes());
}







// let iPsPrueba2 = [
//     "10.10.0.0",
//     "192.168.0.0",
//     "172.16.0.0"
// ];

// for (let ip of iPsPrueba2){
//     let red = new Red(ip);

//     let rangoInferior = red.getRango().limineInferior.join(".");
//     let rangoSuperior = red.getRango().limineSuperior.join(".");
//     console.log(`${rangoInferior} - ${rangoSuperior}     |     Red: ${red.getRed().join(".")}  Final: ${red.getBroadcast().join(".")}`);

//     console.log(red.getAll());
// }


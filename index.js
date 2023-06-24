// CARGAR BIBLIOTECAS
const https = require('https');
const fs = require('fs');


// FUNCION QUE RETORNA UNA PROMESA CON LOS DATOS DE LA API
function request(url){
    return new Promise((resolve) => {
        https
        .get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                // RETORNAMOS LA RESOLUCION DE LA PROMESA
                resolve(JSON.parse(data))
            });
        })
        .on('error', (err) => {
            console.log('Error: ' + err.message)
        });
    })
}


async function input(fileName, fileExt , money, qPesos){

    // VALIDAR DATOS DE ENTRADA
    if (!(fileName) || !(fileExt) || !(money) || !(qPesos)){
        throw "No vienen todos los datos"
    }

    // TRAER DATOS DE LA API EN LA VARIABLE DATA
    const data = await request('https://mindicador.cl/api')
    // buscar la moneda en concreto 
    const moneyObj = data[money]
    // VALIDAMOS LA EXISTENCIA DE LA MONEDA EN LA API
    if (moneyObj){
        moneyObj['file_name'] = fileName
        moneyObj['file_ext'] = fileExt
        moneyObj['qpesos'] = parseInt(qPesos)
        // console.log(moneyObj)

        // CREAR EL ARCHIVO CON LA SALIDA CORRESPONDIENTE

        // A la fecha: Thu Sep 03 2020 18:41:00 GMT-0400 (GMT-04:00) 
        // Fue realizada cotización con los siguientes datos: 
        // Cantidad de pesos a convertir: 250000 pesos 
        // Convertido a "dólar" da un total de: 
        //  $324,06

        let result = moneyObj.qpesos / moneyObj.valor  // OPERACION DE CONVERTIR PESOS A MONEDA X
        
        let cadena = `A la fecha: ${moneyObj.fecha} ${'\n'}Fue realizada cotización con los siguientes datos: ${'\n'}Valor ${moneyObj.codigo}: ${ moneyObj.valor}${'\n'}Cantidad de pesos a convertir: ${moneyObj.qpesos} pesos${'\n'}Convertido a ${moneyObj.codigo} da un total de:${'\n'} ${result.toFixed(2)}`

        // ESCRIBIMOS EN EL ARCHIVO
        fs.writeFile(fileName + "." + fileExt, cadena , 'utf8', () => {
            console.log(cadena);
        });

    }else{
        console.log('Moneda no Encontrada')
    }

}

let argument = process.argv
input(argument[2],argument[3],argument[4],argument[5])
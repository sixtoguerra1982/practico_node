// 1) RECIBIR LOS DATOS POR ARGUMENTO
// 2) DIVIDIR Y VALIDAR LOS DATOS
// 3) API https://mindicador.cl/api

const https = require('https');

function request(url){
    https
    .get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
            // console.log('chunk: ' + chunk);
        });
        resp.on('end', () => {
            // console.log('data:', JSON.parse(data));
            return JSON.parse(data)
        });
    })
    .on('error', (err) => {
        console.log('Error: ' + err.message)
    });
}


async function input(fileName, fileExt , money, qPesos){
    // console.log('file_name', fileName)
    // console.log('file_ext', fileExt)
    // console.log('money', money)
    // console.log('qPesos', qPesos)
    const data = await request('https://mindicador.cl/api')
    // buscar la moneda en concreto 
    console.log(data)
}

let argument = process.argv
input(argument[2],argument[3],argument[4],argument[5])
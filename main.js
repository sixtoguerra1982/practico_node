// Esto es para ejecutar2
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const argument = process.argv.slice(2);

async function ejecutar(archivo, extension, money, qpesos) {
    const { stdout } = await exec(`node index.js ${archivo} ${extension} ${money} ${qpesos}`);
    return stdout;
}

; (async () => {
    if (argument.length != 4){
        throw "No vienen todos los datos"
    }
    const template = await (ejecutar(argument[0],argument[1],argument[2],argument[3]))
    console.log('template:', template);
})();
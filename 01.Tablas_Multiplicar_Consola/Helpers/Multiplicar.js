const { rejects } = require('assert');
const fs = require('fs');

let colors = require('colors');

const crearF = (base = 5,listar= false,hasta=9) => {

    return new Promise((resolve, rejects) => {
        
        let salida = '';
        let consola= '';

        for (let i = 1; i <= hasta; i++) {
            salida += `${base} x ${i} = ${base * i}\n`;
            consola += `${base} ${'x'.red} ${i} ${'='.red} ${base * i}\n`;
        }

        if(listar){
            console.log('==================='.gray);
            console.log(colors.green('Tabla del', base, ':'));
            console.log('==================='.gray);
            console.log(consola);
        }

        fs.writeFileSync(`./Output/Tabla-${base}.txt`, salida);

        resolve(`Tabla-${base}`);
    });
}

module.exports = {
    crearF
}
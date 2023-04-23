const { crearF } = require('./Helpers/Multiplicar');
const argv = require('./Config/Yargs');
require('colors');

console.clear();

//console.log(argv); //Crea un objeto con las banderas que se ingresen en el comando al correr la app

// console.log(process.argv); //muestra lo que procesa la consola (argumentos)

// const [,,arg3='base=5'] = process.argv;
// const [,base=5] = arg3.split('=');

// console.log(base);


// const base = 6;

crearF(argv.base,argv.listar,argv.hasta)
    .then(crearF => console.log(crearF.green,'Creado'.green))
    .catch(err => console.log(err));

const { describe } = require('yargs');

const argv = require('yargs')
            .option('b',{
                alias: 'base',            
                type: 'number',
                demandOption: true,  //required 
                describe: 'Es la base de la tabla de multiplicar'             
            }) 
            .option('l',{
                alias: 'listar',            
                type: 'boolean',
                default: false,
                describe: 'Muestra la tabla de multiplicar'
            })
            .option('h',{
                alias: 'hasta',            
                type: 'number',
                demandOption: true,  //required 
                default: 9,
                describe: 'Limite hasta donde se va a multiplicar'             
            })  
            .check((argv,options) => {
                if(isNaN(argv.base)){
                    throw ('la base debe ser un número.');
                }
                return true;
            })
            .argv;

module.exports = argv;
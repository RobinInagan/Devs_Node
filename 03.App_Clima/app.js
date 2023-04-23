require('dotenv').config();
const {
    inquirerMenu,
    Pause,
    Leer_input,
    ListarLugares,
} = require('./Helpers/_Inquirer');
const Busquedas = require('./Models/Busquedas');


const main = async () => {

    let opt
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Mostrar Mensaje
                const argumento = await Leer_input('Ciudad: ');
                
                //Buscar los lugares
                const lugares = await busquedas.Ciudad(argumento);                
                //Seleccionar el lugar
                const idselect = await ListarLugares(lugares);
                if (idselect === '0') continue;

                const Lugarselect = lugares.find( l => l.id === idselect);
                
                //guardar en DB
                busquedas.Agregar_historial(Lugarselect.nombre);

                //Clima
                const clima = await busquedas.Clima_Lugar(Lugarselect.lat, Lugarselect.lng);

                //Mostrar Resultados
                console.clear();
                console.log('Información de la ciudad\n'.green);
                console.log('Ciudad:',Lugarselect.nombre);
                console.log('Lat: ',Lugarselect.lat);
                console.log('Long: ',Lugarselect.lng);
                console.log('Temperatura:',clima.temp);
                console.log('Mínima: ',clima.min);
                console.log('Máxima: ',clima.max);
                console.log('El clima se ve como:',clima.desc.green);
                break;
            case 2:
                busquedas.Capitalizado.forEach((lugar,i) =>{
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;
        }
        if (opt != 0) await Pause();
    } while (opt != 0);
}

main();
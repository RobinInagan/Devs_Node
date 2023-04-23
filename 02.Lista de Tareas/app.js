require('colors');
const { inquirerMenu,
    Pause,
    Leer_input,
    ListadoTareasBorrar,
    Cofirmar,
    MostrarLsitadoChecklist
} = require('./Helpers/_Inquirer');
const Tareas = require('./Models/Tareas.js');
const { leerDB, guardarDB } = require('./Helpers/Guardar_Archivo.js');

console.clear();


const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        //establecer las tareas
        tareas.Cargar_tarea_from_array(tareasDB);

    }
    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await Leer_input('Descripción: ');
                console.log(desc);
                tareas.Crear_Tarea(desc);
                break;
            case '2':
                tareas.ListadoCompleto();
                break;
            case '3':
                tareas.Listar_Completadas_pendientes(true);
                break;
            case '4':
                tareas.Listar_Completadas_pendientes(false);
                break;
            case '5':
                const ids = await MostrarLsitadoChecklist(tareas.ListadoARR);
                tareas.Toggle_Completado(ids);
                break;
            case '6':
                const id = await ListadoTareasBorrar(tareas.ListadoARR);

                if (id !== '0') {
                    const ok = await Cofirmar('¿Está Seguro?');
                    if (ok) {
                        tareas.BorrarTarea(id);
                        console.log('Tarea Borrada con éxito'.green);
                    }
                }
                break;
        }

        guardarDB(tareas.ListadoARR);

        if (opt !== '0') await Pause();

    } while (opt !== '0');

}


main();
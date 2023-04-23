const inquirer = require('inquirer');

require('colors');

const Preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer? ',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Lugar`
            },
            {
                value: 2,
                name: `${'2.'.green}  Historial`
            },
            {
                value: 0,
                name: `${'0.'.green}  Salir`
            }
        ]
    }
]
const inquirerMenu = async () => {

    console.clear();
    console.log('=============================='.green);
    console.log('   Seleccione una opción'.white);
    console.log('==============================\n'.green);

    const { opcion } = await inquirer.prompt(Preguntas);

    return opcion;
}

const Pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'Enter'.green} para continuar...`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question);
}

const Leer_input = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const ListarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }

    });

    choices.unshift({
        value: '0',
        name: `${'0.'.green}  Volver al Menú`
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione Lugar: ',
            choices
        }
    ]
    const { id } = await inquirer.prompt(questions);
    return id;
}

const Cofirmar = async (msg) => {
    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message: msg
        }
    ];

    const { ok } = await inquirer.prompt(questions);
    return ok;

}

const MostrarLsitadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.Descripcion}`,
            checked: (tarea.CompletadoEn) ? true : false            
        }

    });

    choices.unshift({
        value: '0',
        name: `${'0.'.green}  Volver al Menú`
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(questions);
    return ids;
}

module.exports = {
    inquirerMenu,
    Pause,
    Leer_input,
    ListarLugares,
    Cofirmar,
    MostrarLsitadoChecklist
}

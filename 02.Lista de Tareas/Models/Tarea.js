const { v4: uuidV4 } = require('uuid');

class Tarea {

    id = '';
    Descripcion = '';
    CompletadoEn = null;

    constructor( desc ) {

        this.id = uuidV4();
        this.Descripcion = desc;
        this.CompletadoEn = null;

    }
}

module.exports = Tarea;

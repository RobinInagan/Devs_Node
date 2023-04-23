const Tarea = require('./tarea');
const colors = require('colors');

class Tareas {
    _listado = {};

    get ListadoARR(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    BorrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    Cargar_tarea_from_array(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    Crear_Tarea(desc=''){

        const tarea = new Tarea(desc);
        
        this._listado[tarea.id] = tarea;

    }

    ListadoCompleto(){
        let i = 1;
        console.log('\n');
        this.ListadoARR.forEach(tarea => {
            if(tarea.CompletadoEn == null){
                console.log(`${colors.green(`${i}.`)} ${tarea.Descripcion} :: ${'Pendiente'.red}` );
            }else{
                console.log(`${colors.green(`${i}.`)} ${tarea.Descripcion} :: ${'Completado'.green}` );
            }
            i+=1; 
        });
    }

    Listar_Completadas_pendientes(completado = true){    

        console.log('\n');
        
        this.ListadoARR.forEach( (tarea,i) => {
            const iter = `${i+1}.`.green;
            if(completado){
                if(tarea.CompletadoEn !== null){
                    console.log(`${iter} ${tarea.Descripcion} :: ${tarea.CompletadoEn.green}` );
                }
            }else{
                if(tarea.CompletadoEn == null){
                    console.log(`${iter} ${tarea.Descripcion} :: ${'Pendiente'.red}` );
                }
            }
        });
    }

    Toggle_Completado(ids = []){
        ids.forEach(id => { 
            const tarea = this._listado[id];

            if(tarea.CompletadoEn == null){
                tarea.CompletadoEn = new Date().toISOString();
            }
        });

        this.ListadoARR.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].CompletadoEn = null;
            }
        });
    }
}

module.exports = Tareas;
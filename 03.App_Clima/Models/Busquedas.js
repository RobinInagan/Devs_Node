const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath='./BD/database.json';

    constructor() { //Leer BD si existe
        this.Leer_BD();
    }

    get ParamsMAPBOX(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }

    }
    get ParamsWeather(){
        return{
            'appid': process.env.OPEN_WATER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }
    get Capitalizado(){
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');

        });
    }

    async Ciudad(lugar = '') {
        try {

            // Petición HTTP

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.ParamsMAPBOX
            });

            const resp = await instance.get();
            return resp.data.features.map(lugar =>({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
            // retorna las ciudades o lugares que tienen relación con la ciudad ingresada por el usuario.
        } catch (error) {
            return [];

        }
    }

    async Clima_Lugar(lat,lon){
        try{
            //crear a instancia axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: {...this.ParamsWeather,lat,lon}
            });
            
            const resp = await instance.get();
            //respuesta resp.data
            const {weather,main} = resp.data;

            return {
                desc: weather[0].description,            
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }                
        }catch(error){
            return [];
        }
    }


    Agregar_historial(lugar=''){
        //Prevenir Duplicados
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial = this.historial.splice(0,5);
        this.historial.unshift(lugar.toLocaleLowerCase());
        //grabar en DB o TXT
        this.Escribir_BD();
    }

    Escribir_BD(){
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    Leer_BD(){
        //debe de existir el archivo
        if(!fs.existsSync(this.dbPath)) return 
        //const info = read..
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }
}

module.exports = Busquedas;
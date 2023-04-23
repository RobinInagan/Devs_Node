const fs = require('fs');

const Archivo = './DB/data.JSON';

const guardarDB = (Data) =>{
    fs.writeFileSync(Archivo,JSON.stringify(Data));
}

const leerDB =() =>{
    if(!fs.existsSync(Archivo)){
        return null;
    }

    const info = fs.readFileSync(Archivo,{encoding: 'utf8'});
    const data = JSON.parse(info);
    
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}


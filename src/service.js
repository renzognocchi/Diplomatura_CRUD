const data = require("./Electronicos.json")

module.exports = { createDispositivo : (datas) => {
    let newDispositivo = { 
        codigo: data.length + 1,
        ...datas,
    }
    
    data.push(newDispositivo)
    
    return newDispositivo
}}


const mongoose = require('mongoose')


const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN2);

        console.log('BD Online');

    }catch(error){
        console.error('DETALLE DEL ERROR:', error);
        throw new Error('Error al inicializar la BD');
    }
}

module.exports ={
    dbConnection
}
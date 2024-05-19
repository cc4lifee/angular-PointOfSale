const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection established");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to db");
  }
};


const dbDisconnect = async () => {
  try {
    await mongoose.connection.close();
    console.log('DB Offline');
  } catch (error) {
    console.log(error);
    throw new Error('Error al cerrar la conexión de la BD');
  }
};


module.exports = {
  dbConnection,
  dbDisconnect,
};

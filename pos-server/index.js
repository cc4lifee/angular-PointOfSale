const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

// Crear el servidor Express
const app = express();

// Configurar CORS
app.use(cors());

// Carpeta pública
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Base de datos

dbConnection();

// Rutas
app.use("/api/login", require("./routes/auth"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/suppliers", require("./routes/suppliers"));
app.use("/api/ventas", require("./routes/ventas"));
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/empleados", require("./routes/empleados"));

// Busqueda y Upload descomentados si se requieren en el futuro
// app.use("/api/todo", require("./routes/busquedas"));
// app.use("/api/upload", require("./routes/uploads"));

// Inicializar servidor solo si no se está en modo de prueba

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express listening on port ${PORT}`);
});

// Exportar la aplicación para pruebas
module.exports = app;

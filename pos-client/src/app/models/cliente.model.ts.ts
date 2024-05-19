export interface Cliente {
    _id?: string;
    nombre: string;
    email: string;
    telefono?: string;
    direccion?: string;
    compras?: string[];  // Assuming it references Venta by IDs
    usuario: string;     // Assuming it references Usuario by ID
  }
  
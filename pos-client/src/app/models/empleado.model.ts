export interface Empleado {
    _id?: string;
    nombre: string;
    email: string;
    telefono?: string;
    direccion?: string;
    puesto: string;
    salario?: number;
    usuario: string;     // Assuming it references Usuario by ID
  }
  
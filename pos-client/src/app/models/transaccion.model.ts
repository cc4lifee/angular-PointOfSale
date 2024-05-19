export interface Transaccion {
  _id?: string;
  tipo: 'venta' | 'devolucion' | 'ajuste';
  productos: {
    producto: string; // Assuming it references Producto by ID
    cantidad: number;
    precio: number;
  }[];
  total: number;
  usuario: string; // Assuming it references Usuario by ID
  fecha?: Date;
}

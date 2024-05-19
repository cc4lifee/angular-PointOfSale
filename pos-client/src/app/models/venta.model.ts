export interface Venta {
  _id?: string;
  usuario: string; // Assuming it references Usuario by ID
  cliente?: string; // Assuming it references Cliente by ID
  productos: {
    producto: string; // Assuming it references Producto by ID
    cantidad: number;
    precio: number;
  }[];
  total: number;
  fecha?: Date;
}

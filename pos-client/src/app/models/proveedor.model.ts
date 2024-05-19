export interface Proveedor {
    _id?: string;
    name: string;
    contact_info?: string;
    products?: string[];  // Assuming it references Producto by IDs
  }
  
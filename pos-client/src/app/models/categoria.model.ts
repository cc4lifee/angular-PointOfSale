export interface Categoria {
    _id?: string;
    name: string;
    description?: string;
    productos?: string[];  // Assuming it references Producto by IDs
    usuario: string;       // Assuming it references Usuario by ID
  }
  
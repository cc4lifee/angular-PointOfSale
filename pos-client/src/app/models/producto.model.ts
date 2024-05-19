export interface Producto {
    _id?: string;
    name: string;
    img?: string;
    description?: string;
    price: number;
    quantity: number;
    category: string;  // Assuming it references Categoria by ID
    supplier: string;  // Assuming it references Proveedor by ID
    usuario: string;   // Assuming it references Usuario by ID
    created_at?: Date;
    updated_at?: Date;
  }
  
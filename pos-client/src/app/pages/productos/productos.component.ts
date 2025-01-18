import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.css',
    standalone: false
})
export class ProductosComponent implements OnInit {
  products: MatTableDataSource<Producto> = new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'stock',
    'category',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = new MatTableDataSource(products);
      this.products.paginator = this.paginator;
      this.products.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  // openDialog(product?: Producto): void {
  //   const dialogRef = this.dialog.open(ProductDialogComponent, {
  //     width: '300px',
  //     data: product ? { ...product } : null,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       if (product) {
  //         this.productService
  //           .updateProduct(product._id!, result)
  //           .subscribe(() => this.loadProducts());
  //       } else {
  //         this.productService
  //           .createProduct(result)
  //           .subscribe(() => this.loadProducts());
  //       }
  //     }
  //   });
  // }

  // editProduct(product: Producto): void {
  //   this.openDialog(product);
  // }

  deleteProduct(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            this.loadProducts();
          },
          error: (err) => Swal.fire('Error', err.error.msg, 'error'),
        });
      }
    });
  }
}

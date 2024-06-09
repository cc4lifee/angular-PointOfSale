import { Component } from '@angular/core';

interface Category {
  PK_ID: number;
  CATEGORY_NAME: string;
}

interface DataItem {
  PK_ID: number;
  PERFORMANCE_COLUMN_NAME: string;
  FK_CATEGORY: number;
  CATEGORY_NAME: string;
}

interface PerformanceData {
  name: string;
  [key: string]: any; // This allows dynamic properties
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 
  categorias: Category[] = [
    { PK_ID: 1, CATEGORY_NAME: 'Categoria Nombre 1' },
    { PK_ID: 2, CATEGORY_NAME: 'Categoria Nombre 2' },
    { PK_ID: 3, CATEGORY_NAME: 'Categoria Nombre 3' },
  ];

  data: DataItem[] = [
    { PK_ID: 1, PERFORMANCE_COLUMN_NAME: 'M1', FK_CATEGORY: 1, CATEGORY_NAME: 'Category Nombre 1' },
    { PK_ID: 2, PERFORMANCE_COLUMN_NAME: 'M2', FK_CATEGORY: 1, CATEGORY_NAME: 'Category Nombre 1' },
    { PK_ID: 3, PERFORMANCE_COLUMN_NAME: 'M3', FK_CATEGORY: 1, CATEGORY_NAME: 'Category Nombre 1' },
    { PK_ID: 4, PERFORMANCE_COLUMN_NAME: 'M4', FK_CATEGORY: 1, CATEGORY_NAME: 'Category Nombre 1' },
    { PK_ID: 5, PERFORMANCE_COLUMN_NAME: 'M5', FK_CATEGORY: 1, CATEGORY_NAME: 'Category Nombre 1' },
    { PK_ID: 6, PERFORMANCE_COLUMN_NAME: 'M6', FK_CATEGORY: 1, CATEGORY_NAME: 'Category Nombre 1' },
    { PK_ID: 7, PERFORMANCE_COLUMN_NAME: 'Tx1', FK_CATEGORY: 2, CATEGORY_NAME: 'Categoria Nombre 2' },
    { PK_ID: 8, PERFORMANCE_COLUMN_NAME: 'Tx2', FK_CATEGORY: 2, CATEGORY_NAME: 'Categoria Nombre 2' },
    { PK_ID: 9, PERFORMANCE_COLUMN_NAME: 'Tx3', FK_CATEGORY: 2, CATEGORY_NAME: 'Categoria Nombre 2' },
    { PK_ID: 10, PERFORMANCE_COLUMN_NAME: 'Tx4', FK_CATEGORY: 2, CATEGORY_NAME: 'Categoria Nombre 2' },
    { PK_ID: 11, PERFORMANCE_COLUMN_NAME: 'PS1', FK_CATEGORY: 3, CATEGORY_NAME: 'Categoria Nombre 3' },
    { PK_ID: 12, PERFORMANCE_COLUMN_NAME: 'PS2', FK_CATEGORY: 3, CATEGORY_NAME: 'Categoria Nombre 3' },
    { PK_ID: 13, PERFORMANCE_COLUMN_NAME: 'PS3', FK_CATEGORY: 3, CATEGORY_NAME: 'Categoria Nombre 3' },
    { PK_ID: 14, PERFORMANCE_COLUMN_NAME: 'PS4', FK_CATEGORY: 3, CATEGORY_NAME: 'Categoria Nombre 3' },
  ];

  performanceData: PerformanceData[] = [
    { name: 'Boeing 747', M1: 100, M2: 101, M3: 102, M4: 103, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Airbus A380', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Concorde', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Lockheed Martin F-22 Raptor', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Boeing 747', M1: 100, M2: 101, M3: 102, M4: 103, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Airbus A380', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Concorde', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Lockheed Martin F-22 Raptor', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Boeing 747', M1: 100, M2: 101, M3: 102, M4: 103, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Airbus A380', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Concorde', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Lockheed Martin F-22 Raptor', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Airbus A380', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Concorde', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Lockheed Martin F-22 Raptor', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Boeing 747', M1: 100, M2: 101, M3: 102, M4: 103, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Airbus A380', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Concorde', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
    { name: 'Lockheed Martin F-22 Raptor', M1: 100, M2: 200, M3: 300, M4: 400, M5: 500, M6: 600, Tx1: 120, Tx2: 220, Tx3: 320, Tx4: 420, PS1: 130, PS2: 230, PS3: 330, PS4: 430 },
  ];

  categorizedData: { category: Category, data: DataItem[], performanceData: PerformanceData[] }[] = [];
  showAllCategories = false;

  ngOnInit() {
    this.categorizedData = this.categorias.map(category => ({
      category,
      data: this.data.filter(item => item.FK_CATEGORY === category.PK_ID),
      performanceData: this.performanceData.filter(p => this.data.some(d => d.FK_CATEGORY === category.PK_ID && p.hasOwnProperty(d.PERFORMANCE_COLUMN_NAME)))
    }));
  }

  toggleCategories() {
    this.showAllCategories = !this.showAllCategories;
  }
}
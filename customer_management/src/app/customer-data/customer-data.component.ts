import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css'],
})
export class CustomerDataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>; // Data source for the table

  displayedColumns: string[] = ['id', 'name', 'number', 'email', 'action'];  // Columns to be displayed in the table

  constructor(
    private customerService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadCustomerData();  // Load customer data on component initialization
  }

  searchControl = new FormControl(); // Control for filtering customer data based on search
  
  // Loads customer data from the server.
  loadCustomerData() {
    this.customerService.getCustomerList().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data); // Set the data source for the MatTable
      this.dataSource.paginator = this.paginator; // Set the paginator for the MatTable
      this.dataSource.sort = this.sort; // Set the sorting for the MatTable
    });
  }

  // Displays a snackbar message with custom styling.
  private showSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, '', {
      duration: 4000,  // Display duration for the snackbar (4 seconds)
      panelClass: panelClass, // Custom styling for the snackbar
    });
  }

  // Deletes a customer by ID.
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(() => {
      // After deleting, reload the customer data
      this.loadCustomerData();
      this.showSnackBar('Customer deleted successfully', 'success');
    });
  }

  // Navigates to the customer edit page using the customer's ID.
  editCustomer(customer: any) {
    this.router.navigate(['customer', customer.id]);
  }

  // Filters the MatTable data based on the search input.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
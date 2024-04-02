import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private server: HttpClient) {}

  // Method to add a new customer to the server
  addCustomer(data: any): Observable<any> {
    return this.server.post('http://localhost:3000/customers', data).pipe(
      catchError((error: any) => {
        console.error('Error adding customer: ', error);
        throw error;
      })
    );
  } 

  // Method to fetch customer details by ID
  getCustomer(id: number): Observable<any> {
    return this.server.get(`http://localhost:3000/customers/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error fetching customer details: ', error);
        throw error;
      })
    );
  }

  // Method to update customer details by ID
  updateCustomer(id: number, data: any): Observable<any> {
    return this.server.put(`http://localhost:3000/customers/${id}`, data).pipe(
      catchError((error: any) => {
        console.error('Error updating customer: ', error);
        throw error;
      })
    );
  }
  
  // Method to fetch the list of all customers
  getCustomerList(): Observable<any> {
    return this.server.get('http://localhost:3000/customers').pipe(
      catchError((error: any) => {
        console.error('Error fetching customer list: ', error);
        throw error;
      })
    );
  }
  
  // Method to delete a customer by ID
  deleteCustomer(id: number): Observable<any> {
    return this.server.delete(`http://localhost:3000/customers/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error deleting customer: ', error);
        throw error;
      })
    );
  }
}




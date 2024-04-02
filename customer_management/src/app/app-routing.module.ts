import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDataComponent } from './customer-data/customer-data.component'; 

const routes: Routes = [
  {
    path: 'customer', // Route path for adding or editing a customer
    component: CustomerComponent // Load the CustomerComponent when this route is activated
  },
  {
    path: 'customer/:id', // Route path with a segment for editing a specific customer
    component: CustomerComponent // Load the CustomerComponent for editing
  },
  {
    path: 'customer-data',  // Route path for displaying the list of customers
    component: CustomerDataComponent, // Load the CustomerDataComponent when this route is activated
  },
  {
    path: '', // Default route when no path is specified (redirect to customer-data)
    redirectTo: '/customer-data', // Redirect to the 'customer-data' route
    pathMatch: 'full' // Match the full path
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
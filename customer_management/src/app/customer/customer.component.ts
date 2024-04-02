import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export function nameValidator(control: any) {
  const validNamePattern = /^[a-zA-Z ]+$/;
  const isValid = validNamePattern.test(control.value);
  return isValid ? null : { invalidName: true };
}

export function phoneNumberValidator(control: any) {
  const validPhoneNumberPattern = /^[0-9]+$/;
  const isValid = validPhoneNumberPattern.test(control.value);
  return isValid ? null : { invalidPhoneNumber: true };
}

export function emailValidator(control: any) {
  const validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = validEmailPattern.test(control.value);
  return isValid ? null : { invalidEmail: true };
}
@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customerForm: FormGroup; // Form to collect customer data
  data: any; // Data for editing an existing customer
  isEditing: boolean = false; // update/edit mode

  constructor(
    private formbuild: FormBuilder,
    private customerService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.formbuild.group({
      fullName: ['', [Validators.required, nameValidator]], // Full name field with validation
      number: ['', [Validators.required, phoneNumberValidator]], // Phone number field with validation
      email: ['', [Validators.required, emailValidator]], // Email field with validation
    });
  }

  redirectToCustomerData() {
    this.router.navigate(['customer-data']); // Navigate to the Customer Data component
  }
  ngOnInit(): void {
    // Check if there is customer data in the router state
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.customerService.getCustomer(params['id']).subscribe((data: any) => {
          this.data = data;
          this.isEditing = true; 
          this.customerForm.patchValue({
            fullName: this.data.fullName,
            number: this.data.number,
            email: this.data.email,
          });
        });
      }
    });
  }

  private showSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, '', {
      duration: 4000,  // Display duration for the snackbar
      panelClass: panelClass, // Custom styling for the snackbar
    });
  }

  onFormSubmit() {
    if (this.customerForm.valid) {
      if (this.isEditing) {
        // Update customer if in editing mode
        this.customerService.updateCustomer(this.data.id, this.customerForm.value).subscribe({
          next: () => {
            this.router.navigate(['customer-data']);
            this.showSnackBar('Customer updated successfully', 'success');
          },
          error: (err: any) => {
            console.error(err);
            this.showSnackBar('Error updating customer', 'error');
          },
        });
      } else {
        // Add new customer if not in editing mode
        this.customerService.addCustomer(this.customerForm.value).subscribe({
          next: () => {
            this.router.navigate(['customer-data']);
            this.showSnackBar('Customer added successfully', 'success');
          },
          error: (err: any) => {
            console.error(err);
            this.showSnackBar('Error adding customer', 'error');
          },
        });
      }
    }
  }
}
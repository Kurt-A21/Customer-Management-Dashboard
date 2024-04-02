import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer.component';
import { DataService } from '../data.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataComponent } from '../customer-data/customer-data.component';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: Router;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockActivatedRoute = {
      params: of({ id: '1' }), // Route parameter value 
    };
    dataService = jasmine.createSpyObj('DataService', [
      'addCustomer',
      'updateCustomer',
      'getCustomer',
    ]);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'customer-data', component: CustomerDataComponent },
        ]),
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: ActivatedRoute, useValue: mockActivatedRoute  }, // Simulate ActivatedRoute
      ],
    });

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inject the Router
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Submit" as the submit button text', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.textContent).toContain('Submit');
  });

  it('should display a Full Name input field and its error message', () => {
    const fullNameInput = fixture.nativeElement.querySelector('input[formControlName="fullName"]');
    const fullNameErrorMessage = fixture.nativeElement.querySelector('mat-error[for="fullName"]');

    expect(fullNameInput).toBeTruthy();
    expect(fullNameErrorMessage).toBeFalsy();
  });

  it('should display a Phone Number input field and its error message', () => {
    const phoneNumberInput = fixture.nativeElement.querySelector('input[formControlName="number"]');
    const phoneNumberErrorMessage = fixture.nativeElement.querySelector('mat-error[for="number"]');

    expect(phoneNumberInput).toBeTruthy();
    expect(phoneNumberErrorMessage).toBeFalsy();
  });

  it('should display an Email input field and its error message', () => {
    const emailInput = fixture.nativeElement.querySelector('input[formControlName="email"]');
    const emailErrorMessage = fixture.nativeElement.querySelector('mat-error[for="email"]');

    expect(emailInput).toBeTruthy();
    expect(emailErrorMessage).toBeFalsy();
  });
});
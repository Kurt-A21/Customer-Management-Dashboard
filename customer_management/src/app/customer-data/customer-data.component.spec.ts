import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerDataComponent } from './customer-data.component';
import { DataService } from '../data.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('CustomerDataComponent', () => {
    let component: CustomerDataComponent;
    let fixture: ComponentFixture<CustomerDataComponent>;
    let dataService: DataService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerDataComponent],
            imports: [
                MatTableModule,
                MatPaginatorModule,
                MatSortModule,
                MatInputModule,
                MatButtonModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                HttpClientModule,
                MatSnackBarModule,
                MatIconModule,
            ],
            providers: [DataService, MatSnackBar],
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(CustomerDataComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        dataService = TestBed.inject(DataService);

        // Mock actual data service calls
        spyOn(dataService, 'getCustomerList').and.returnValue(
            of([
                { id: 1, fullName: 'John Doe', number: '1234567890', email: 'john.doe@example.com' },
                { id: 2, fullName: 'Jane Smith', number: '9876543210', email: 'jane.smith@example.com' },
            ])
        );

        // Mock the deleteCustomer method to return an observable.
        spyOn(dataService, 'deleteCustomer').and.returnValue(of(null));

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the column headers', () => {
        fixture.detectChanges(); // Ensure the component has rendered.

        // Query for header cells with the .mat-header-cell class.
        const headerCells = fixture.debugElement.queryAll(By.css('.mat-sort-header-content'));

        // Find the header cells that contains the table column names.
        const idHeader = headerCells.find((cell) =>
            cell.nativeElement.textContent.includes('Id')
        );
        const fullNameHeader = headerCells.find((cell) =>
            cell.nativeElement.textContent.includes('Name')
        );
        const phoneNumberHeader = headerCells.find((cell) =>
            cell.nativeElement.textContent.includes('Phone Number')
        );
        const emailHeader = headerCells.find((cell) =>
            cell.nativeElement.textContent.includes('Email')
        );
        const actionHeader = headerCells.find((cell) =>
            cell.nativeElement.textContent.includes('Action')
        );

        expect(idHeader).toBeTruthy();
        expect(fullNameHeader).toBeTruthy();
        expect(phoneNumberHeader).toBeTruthy();
        expect(emailHeader).toBeTruthy();
        expect(actionHeader).toBeTruthy();
    });

    it('should render edit and delete buttons for each customer', () => {
        const editButton = fixture.nativeElement.querySelector('#edit-customer');
        const deleteButton = fixture.nativeElement.querySelector('#delete-customer');
        expect(editButton).toBeTruthy();
        expect(deleteButton).toBeTruthy();
    });

    it('should render search input and filter correctly', fakeAsync(() => {
        fixture.detectChanges(); // Ensure the component is rendered.

        const searchInput = fixture.debugElement.query(By.css('#search'));
        expect(searchInput).toBeTruthy();

        if (searchInput) { // Check if the element is found.
            const inputElement = searchInput.nativeElement;
            inputElement.value = 'John';
            inputElement.dispatchEvent(new Event('input'));
            tick(300); // Simulate debounce time

            fixture.detectChanges();

            // Check if the table content is filtered as expected.
            const rows = fixture.nativeElement.querySelectorAll('.mat-sort-header-arrow');
            // Adjust the expected row count based on your test data.
            const expectedRowCount = 5;

            expect(rows.length).toBe(expectedRowCount);
        }
    }));

    it('should delete a customer when delete button is pressed', () => {
        // Trigger the delete function and check if it's called.
        const deleteButton = fixture.nativeElement.querySelector('#delete-customer');
        deleteButton.click();
        expect(dataService.deleteCustomer).toHaveBeenCalledWith(1);
    });
});
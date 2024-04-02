import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
    let service: DataService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService],
        });
        service = TestBed.inject(DataService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    // Test case to ensure that the DataService is created successfully
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

     // Test case to check if the 'addCustomer' method adds a new customer
    it('should add a customer', () => {
        const customerData = {
            'fullName': 'John Doe',
            'number': '1234567890',
            'email': 'john@example.com'
        };

        // Call the 'addCustomer' method and expect a successful response
        service.addCustomer(customerData).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpTestingController.expectOne('http://localhost:3000/customers');
        expect(req.request.method).toBe('POST');
        req.flush({}); // Simulate a successful response

        httpTestingController.verify();
    });

    // Test case to check if the 'getCustomer' method fetches customer details by ID
    it('should get a customer by id', () => {
        const customerId = 1;

        // Call the 'deleteCustomer' method and check the response
        service.getCustomer(customerId).subscribe(response => {
            expect(response).toEqual(customerId);
        });

        // Verify that a GET request was made to the specified URL
        const req = httpTestingController.expectOne(`http://localhost:3000/customers/${customerId}`);
        expect(req.request.method).toBe('GET');
        req.flush(customerId);
    });

    // Test case to check if the 'updateCustomer' method updates a customer
    it('should update a customer', () => {
         // Define a sample customer ID and the updated data
        const customerId = 3;
        const updatedCustomerData = {
            'fullName': 'Updated Name',
            'number': '9876543210',
            'email': 'updated@example.com'
        };

        // Call the 'updateCustomer' method to update the customer and check the response
        service.updateCustomer(customerId, updatedCustomerData).subscribe(response => {
            expect(response).toBeTruthy();  // Check if the response is successful
        });

        // Verify that a PUT request was made to the specified URL with the updated data
        const req = httpTestingController.expectOne(`http://localhost:3000/customers/${customerId}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedCustomerData); // Check if the request contains the updated data
        req.flush({}); // Simulate a successful response
    });

    it('should get the customer list', () => {
        const mockCustomerList = [
            {
                'fullName': 'John Doe',
                'number': '1234567890',
                'email': 'john@example.com',
                id: 1,
            },
            {
                'fullName': 'Kurt Adriaanse',
                'number': '9217639',
                'email': 'test@gmail.com',
                id: 2,
            }
        ];

        service.getCustomerList().subscribe(response => {
            expect(response).toEqual(mockCustomerList);
            expect(response.length).toBe(2);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/customers');
        expect(req.request.method).toBe('GET');
        req.flush(mockCustomerList);
    });

    // Test case to check if the 'deleteCustomer' method deletes a customer
    it('should delete a customer', () => {
        const customerId = 1;

        // Call the 'deleteCustomer' method and check the response
        service.deleteCustomer(customerId).subscribe(response => {
            expect(response).toEqual(customerId);
        });

        // Call the 'deleteCustomer' method and check the response
        const req = httpTestingController.expectOne(`http://localhost:3000/customers/${customerId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(customerId);
    });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
    }).compileComponents(); // Compile the component and its template.
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have a title 'customer-management app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('customer-management app'); // Check if the title matches
  });

  it('should render title', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Customer Management Dashboard'); // Check if the title is displayed in the HTML
  });

  it('should contain "Customer Table" and "Add Customer" buttons', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    // Check if the buttons are present
    const customerTableButton = compiled.querySelector('a[href="/customer-data"]');
    const addCustomerButton = compiled.querySelector('a[href="/customer"]');

    expect(customerTableButton).toBeTruthy();
    expect(addCustomerButton).toBeTruthy();

    // Check the text content of the buttons
    expect(customerTableButton.textContent).toContain('Customer Table');
    expect(addCustomerButton.textContent).toContain('Add Customer');
  });
});
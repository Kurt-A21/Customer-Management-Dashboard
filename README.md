# RaD-GP-C23-P-G3

## Customer Management App
This is a simple Customer Management Application built using Angular. The app allows users to add and manage customer records, including their full name, phone number, and email address. It uses JSON-Server as a mock backend to store customer data.

## Features

- Add new customer records.
- Update existing customer records.
- View a list of all customer records.
- Delete customer records.
- Search for customers by name.
- Clean and user-friendly interface.

## Getting started / How to run app

Before running the application, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- Angular CLI (install using npm install -g @angular/cli)
- JSON-Server (install using npm install -g json-server)

## Installation

1. Clone the repository to your local machine with SSH:
```
https://gitlab1a.prod.eu-west-1.aws.clickatell.com/kurt.adriaanse/git@gitlab1a.prod.eu-west-1.aws.clickatell.com:kurt.adriaanse/rad-gp-c23-p-g3.git
```

2. Change the directory to the project folder.
```
cd customer_management
```

3. Install project dependencies:
```
npm install
```

4. Start JSON-Server to simulate the backend:
```
json-server --watch db.json
```

5. Start the Angular development server:
```
ng serve
```

6. Open your web browser and navigate to http://localhost:4200/ to access the app.

7. To run the unit test for the components and services. Use the following command:
```
ng test
```

## Usage

- The app's main page shows a Customer Management Dashboard with options to navigate to the Customer Table and Add Customer.
- Click on "Add Customer" to enter customer details and add a new customer.
- Click on "Customer Table" to view all customer records.
- In the Customer Table, you can edit or delete customer records. You can also search for customers by name.
- All API calls are simulated using JSON-Server.

## Project Structure

- src/app/components: Contains the Angular components.
- src/app/services: Includes the data service for making HTTP requests.
- src/app/models: Defines the data models.
- src/app/app-routing.module.ts: Defines the application routes.
- db.json: JSON-Server mock database.
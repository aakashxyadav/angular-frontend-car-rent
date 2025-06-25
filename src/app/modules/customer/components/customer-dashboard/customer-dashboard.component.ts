import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  cars: any[] = [];
  isLoading: boolean = false;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.isLoading = true;
    console.log('Fetching cars from API: /api/v1/customer/cars (Railway URL: https://your-app-name.up.railway.app)');
    this.customerService.getAllCars()
      .pipe(
        catchError(this.handleError)
      )
      .subscribe({
        next: (res: any) => {
          console.log('Cars response:', res);
          // Handle response with carDtoList
          const carList = res.carDtoList || [];
          this.cars = carList.map((element: any) => ({
            ...element,
            processedImg: element.returnedImg ? 'data:image/jpeg;base64,' + element.returnedImg : null
          }));
          this.isLoading = false;
          if (this.cars.length === 0) {
            console.log('No cars available');
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Error fetching cars:', error);
          console.error('Error status:', error.status, 'Error message:', error.message);
          if (error.status === 404) {
            console.error('Backend endpoint /api/v1/customer/cars not found. Verify Railway deployment.');
          } else if (error.status === 503) {
            console.error('Backend unavailable. Check Railway deploy logs for issues.');
          }
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred';
    if (error.status === 404) {
      errorMessage = 'Cars data not found. Ensure /api/v1/customer/cars is deployed on Railway.';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized. Please log in again.';
    } else if (error.status === 500 || error.status === 503) {
      errorMessage = 'Server error. Check Railway logs for issues.';
    }
    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
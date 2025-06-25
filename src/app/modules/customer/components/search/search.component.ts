import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  cars: any = [];
  searchClicked = false;

  searchForm!: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = [
    'BMW',
    'Audi',
    'Mercedes',
    'Toyota',
    'Honda',
    'Nissan',
    'Mazda',
    'Ford',
    'Chevrolet',
    'Jeep',
    'Kia',
    'Hyundai',
    'Volkswagen',
    'Fiat',
    'Peugeot',
    'Renault',
    'Skoda',
    'Volvo',
    'Suzuki',
    'Subaru',
    'Mitsubishi',
    'Lexus',
    'Infiniti',
    'Acura',
    'Cadillac',
    'Buick',
    'Lincoln',
    'Chrysler',
    'Dodge',
    'Tesla',
    'Jaguar',
    'Land Rover',
    'Porsche',
    'Ferrari',
    'Maserati',
    'Lamborghini',
    'Bentley',
    'Rolls Royce',
    'McLaren',
    'Bugatti',
    'Lotus',
    'Alfa Romeo',
    'Aston Martin',
    'Morgan',
    'Mini',
    'Smart',
    'Opel',
    'Seat',
    'Citroen',
    'Dacia',
    'Lada',
    'Saab',
    'Daewoo',
    'Lancia',
    'Tata',
    'Mahindra',
    'Isuzu',
    'Proton',
    'Geely',
    'Chery',
    'Great Wall',
    'Zotye',
    'Changan',
    'BYD',
    'Brilliance',
    'JAC',
    'Haval',
    'Dongfeng',
    'Foton',
    'GAC',
    'BAIC',
    'Chery',
    'Other',
  ];
  listOfType = ['Hybird', 'Electric', 'Petrol', 'Diesel', 'Gas', 'Other'];
  listOfColor = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Black',
    'White',
    'Silver',
    'Grey',
    'Brown',
    'Orange',
    'Purple',
    'Pink',
    'Other',
  ];
  listOfTransmission = ['Automatic', 'Manual', 'Semi-Automatic'];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) { 
    this.searchForm = this.fb.group({
      brand: [''],
      type: [''],
      transmission: [''],
      color: [''],
    })
  }

  search() {
    this.searchClicked = true;
  
    console.log('Search form values:', this.searchForm.value);
  
    this.customerService.search(this.searchForm.value).subscribe({
      next: (res: any) => {
        console.log('Search API response:', res);
  
        // Reset cars list before updating
        this.cars = [];
  
        res.carDtoList.forEach((element: any) => {
          element.processedImg = element.returnedImg 
            ? 'data:image/jpeg;base64,' + element.returnedImg 
            : null;
          this.cars.push(element);
        });
  
        if (this.cars.length === 0) {
          console.log('No matching cars found.');
        }
      },
      error: (err) => {
        console.error('Search API failed:', err);
      }
    });
  }

  get transmission() {
    return this.searchForm.get('transmission');
  }

  get brand() {
    return this.searchForm.get('brand');
  }

  get type() {
    return this.searchForm.get('type');
  }

  get color() {
    return this.searchForm.get('color');
  }

}

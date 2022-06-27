import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  BASE_URL = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) { }

  createPlant(plant: any) {
    return this.http.post(`${this.BASE_URL}/plant/create`, {
      plant: plant
    }, {
      headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    });
  }
}

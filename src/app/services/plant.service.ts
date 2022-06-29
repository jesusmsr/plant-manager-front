import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  BASE_URL = 'http://127.0.0.1:8000';

  reloadPlantsTable: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  createPlant(plant: any) {
    return this.http.post(`${this.BASE_URL}/plant/create/`, plant);
  }

  uploadImg(image: any, plant: Plant) {
    return this.http.post(`${this.BASE_URL}/plant/${plant.id}/add-image/`, image);
  }

  getAllPlants() {
    return this.http.get(`${this.BASE_URL}/plant/list/`);
  }

  getPlantById(id: any) {
    return this.http.get(`${this.BASE_URL}/plant/${id}/`);
  }
}

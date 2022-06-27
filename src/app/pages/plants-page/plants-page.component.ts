import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plants-page',
  templateUrl: './plants-page.component.html',
  styleUrls: ['./plants-page.component.css']
})
export class PlantsPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private plantService: PlantService
  ) { }

  addPlantForm = this.formBuilder.group({
    plantName: [''],
    image: ['']
  })

  ngOnInit(): void {
  }

  onSubmit() {
    let plant = new Plant();
    plant.plantName = this.addPlantForm.value.plantName;
    plant.image = this.addPlantForm.value.image;
    console.log(this.addPlantForm.value);
    this.plantService.createPlant(plant).subscribe(response => {
      console.log(response);
    })
  }

}

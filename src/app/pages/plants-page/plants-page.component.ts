import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plants-page',
  templateUrl: './plants-page.component.html',
  styleUrls: ['./plants-page.component.css']
})
export class PlantsPageComponent implements OnInit {

  @ViewChild('closeModal') closeModal!: ElementRef

  constructor(
    private formBuilder: FormBuilder,
    private plantService: PlantService
  ) { }

  addPlantForm = this.formBuilder.group({
    name: [''],
    code: [''],
    type: ['']
  })

  ngOnInit(): void {
  }

  onSubmit() {
    let plant = new Plant();
    plant.name = this.addPlantForm.value.name;
    plant.code = this.addPlantForm.value.code;
    plant.type = this.addPlantForm.value.type;
    console.log(this.addPlantForm.value);
    this.plantService.createPlant(plant).subscribe(response => {
      this.plantService.reloadPlantsTable.next(true);
      this.closeModal.nativeElement.click();
    })
  }

}

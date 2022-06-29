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
    image: ['']
  })

  ngOnInit(): void {
  }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addPlantForm.get('image')!.setValue(file);
    }
  }

  onSubmit() {
    let formData = new FormData();
    let plant = new Plant();
    plant.name = this.addPlantForm.value.name;
    formData.append('name', this.addPlantForm.value.name);
    formData.append('image', this.addPlantForm.get('image')!.value);
    
    this.plantService.createPlant(formData).subscribe(response => {
      this.plantService.reloadPlantsTable.next(true);
      this.closeModal.nativeElement.click();
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.css']
})
export class PlantFormComponent implements OnInit {

  plantId!: string;
  plant!: Plant;
  plantDetailForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private plantService: PlantService,
    private formBuilder: FormBuilder,
  ) { }

  imageForm = this.formBuilder.group({
    image: ['']
  });


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.plantId = params.get('id')!;
      this.plantService.getPlantById(this.plantId).subscribe((value: any) => {
        this.plant = value;
        console.log(this.plant);

        this.plantDetailForm = this.formBuilder.group({
          name: [this.plant.name],
          code: [this.plant.code],
          type: [this.plant.type]
        });
      });
    });
  }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageForm.get('image')!.setValue(file);
    }
  }

  onSubmitImage() {
    const formData = new FormData();
    formData.append('image', this.imageForm.get('image')!.value);

    this.plantService.uploadImg(formData, this.plant).subscribe((response: any) => {
      console.log(response);
    })
  }

}

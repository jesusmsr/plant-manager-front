import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('openImageFilePicker') openImageFilePicker!: ElementRef

  plantId!: string;
  plant!: Plant;
  plantDetailForm!: FormGroup;
  formData = new FormData();

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

        this.plantDetailForm = this.formBuilder.group({
          name: [this.plant.name],
          image: [this.plant.image]
        });
      });
    });
  }

  onChange(event: any) {
    let formData = new FormData();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.plantDetailForm.get('image')!.setValue(file);
    }
    this.formData.append('image', this.plantDetailForm.get('image')!.value);
    this.plantService.updatePlant(this.formData, this.plantId).subscribe((response: any)=>{
      window.location.reload();
    })
  }

  openFilePicker(){
    this.openImageFilePicker.nativeElement.click();
  }

  onSubmit(){
    
    this.formData.append('name', this.plantDetailForm.value.name);

    this.plantService.updatePlant(this.formData, this.plantId).subscribe((response: any)=>{
      window.location.reload();
    })
  }

  onSubmitImage() {
    const formData = new FormData();
    formData.append('image', this.imageForm.get('image')!.value);

    this.plantService.uploadImg(formData, this.plant).subscribe((response: any) => {
      console.log(response);
    })
  }

}

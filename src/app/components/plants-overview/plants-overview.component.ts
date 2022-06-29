import { Component, Input, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plants-overview',
  templateUrl: './plants-overview.component.html',
  styleUrls: ['./plants-overview.component.css']
})
export class PlantsOverviewComponent implements OnInit {

  constructor(
    private plantService: PlantService
  ) { }

  items!: Plant[];

  ngOnInit(): void {
    this.plantService.getAllPlants().subscribe((response: any) => {
      this.items = response;
    });

    this.plantService.reloadPlantsTable.subscribe(()=>{
      this.plantService.getAllPlants().subscribe((response: any) => {
        this.items = response;
      });
    })
  }

}

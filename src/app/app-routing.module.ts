import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PlantFormComponent } from './pages/plant-form/plant-form.component';
import { PlantsPageComponent } from './pages/plants-page/plants-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'plants', component: PlantsPageComponent },
  { path: 'plant/:id', component: PlantFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

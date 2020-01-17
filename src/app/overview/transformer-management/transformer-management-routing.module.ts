import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransformerManagementComponent } from './transformer-management.component';
import { AssetComponent } from './asset/asset.component';
import { AssetsComponent } from './assets/assets.component';
import {AssetEditComponent} from './asset-edit/asset-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TransformerManagementComponent,
    children: [
      { path: 'assets', component: AssetsComponent, pathMatch: 'full' },
      { path: 'add-new', component: AssetComponent, pathMatch: 'full' },
      { path: 'assets/:id', component: AssetEditComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'assets' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransformerManagementRoutingModule { }

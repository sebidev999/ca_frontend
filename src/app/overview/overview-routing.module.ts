import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'transformer-management', loadChildren: './transformer-management/transformer-management.module#TransformerManagementModule'},
  { path: 'event-configuration', loadChildren: './event-configuration/event-configuration.module#EventConfigurationModule' },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }

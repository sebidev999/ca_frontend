import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventConfigurationComponent } from './event-configuration.component';
import { CategoryComponent } from './category/category.component';
import { TableComponent } from './table/table.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EVENT_TABS } from '../../../assets/consts/event.table.const';

const routes: Routes = [
  { path: '',
    component: EventConfigurationComponent,
    children: [
      { path: EVENT_TABS.CATEGORY, component: CategoryComponent, pathMatch: 'full' },
      { path: EVENT_TABS.TABLE, component: TableComponent, pathMatch: 'full' },
      { path: 'table/:id', component: EventDetailComponent, pathMatch: 'full' },
      { path: '', redirectTo: EVENT_TABS.CATEGORY }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EventConfigurationRoutingModule { }

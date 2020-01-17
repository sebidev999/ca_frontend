import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventConfigurationRoutingModule } from './event-configuration-routing.module';
import { EventConfigurationComponent } from './event-configuration.component';
import { CategoryComponent } from './category/category.component';
import { TableComponent } from './table/table.component';
import { SharedModule } from '../../shared/shared.module';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [EventConfigurationComponent, CategoryComponent, TableComponent, EventDetailComponent, CategoryListComponent],
  imports: [
    CommonModule,
    EventConfigurationRoutingModule,
    SharedModule,
  ],

})
export class EventConfigurationModule { }

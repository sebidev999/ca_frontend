import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransformerManagementRoutingModule } from './transformer-management-routing.module';
import { TransformerManagementComponent } from './transformer-management.component';
import { AssetComponent } from './asset/asset.component';
import { AssetsComponent } from './assets/assets.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { GeneralComponent } from './general/general.component';
import { FieldDeviceComponent } from './field-device/field-device.component';
import { LocationListComponent } from './location-list/location-list.component';
import { DeviceModalComponent } from './device-modal/device-modal.component';

@NgModule({
  declarations: [
    TransformerManagementComponent,
    AssetComponent, AssetsComponent,
    AssetEditComponent,
    LocationModalComponent,
    GeneralComponent,
    FieldDeviceComponent,
    LocationListComponent,
    DeviceModalComponent,
    ],
  imports: [
    CommonModule,
    TransformerManagementRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    LocationModalComponent,
    DeviceModalComponent
  ]
})
export class TransformerManagementModule { }

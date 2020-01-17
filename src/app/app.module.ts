import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducer as appReducer } from './store/app.reducer';
import { AssetEffects } from './store/asset/asset.effects';
import { EventEffects } from './store/event/event.effects';
import { LocationEffects } from './store/location/location.effects';
import { DeviceEffects } from './store/device/device.effects';

import { SharedModule } from './shared/shared.module';
import { CsvService } from './core/service/csv.service';
import { ChangeCheckService } from './core/service/change-check.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AssetEffects, EventEffects, LocationEffects, DeviceEffects]),
    StoreDevtoolsModule.instrument({
      name: 'configuration',
    })
  ],
  providers: [
    CsvService,
    ChangeCheckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

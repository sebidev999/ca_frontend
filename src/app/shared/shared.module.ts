import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HeaderComponent } from './components/header/header.component';
import { CancelModalComponent } from './components/cancel-modal/cancel-modal.component';

import { PipeModule } from './pipe/pipe.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NoWhiteSpaceDirective } from './directives/no-white-space.directive';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [HeaderComponent, CancelModalComponent, PaginatorComponent, DropdownComponent, NoWhiteSpaceDirective],
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    InlineSVGModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    HeaderComponent,
    CancelModalComponent,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
    ModalModule,
    BsDropdownModule,
    HttpClientModule,
    InlineSVGModule,
    PaginatorComponent,
    DropdownComponent,
    NoWhiteSpaceDirective
  ],
  entryComponents: [
    CancelModalComponent,
  ]
})
export class SharedModule { }

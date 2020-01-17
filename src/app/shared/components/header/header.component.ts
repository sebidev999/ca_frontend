import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LANGUAGE } from '../../../../assets/consts/browser.languages';

@Component({
  selector: 'tes-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /**
   * The current language
   */
  public currentLanguage: string = 'en';

  /**
   * 
   * @param translateService The translate service
   */
  constructor(
    public translateService: TranslateService,
  ) {
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang === LANGUAGE.EN || browserLang === LANGUAGE.DE) {
      this.translateService.use(browserLang);
    } else {
      this.translateService.use(LANGUAGE.EN);
    }
  }
}

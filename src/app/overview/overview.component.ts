import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { LANGUAGE } from '../../assets/consts/browser.languages';

@Component({
  selector: 'tes-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

/**
 * The component class for overview page.
 */
export class OverviewComponent {

  /**
   *
   * @param translateService The translate service
   * @param router The router
   */
  constructor(
    private readonly translateService: TranslateService,
    private readonly router: Router,
  ) {
    /**Set browser lang for translation pipe */
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang === LANGUAGE.EN || browserLang === LANGUAGE.DE) {
      this.translateService.use(browserLang);
    } else {
      this.translateService.use(LANGUAGE.EN);
    }
  }

  /**
   * Redirects to main pages.
   * @param route: The value of the relative endpoint
   */
  public goTo(route: string): void {
    this.router.navigate([`overview/${route}`]).then();
  }
}

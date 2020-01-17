import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tes-transformer-management',
  templateUrl: './transformer-management.component.html',
  styleUrls: ['./transformer-management.component.scss']
})

/**
 * The component class for transformer management.
 */
export class TransformerManagementComponent {

  /**
   *
   * @param router The router
   */
  constructor(
    private readonly router: Router,
  ) { }

  /**
   * Redirects to overview page.
   */
  public redirect(): void {
    this.router.navigate([`/overview`]).then();
  }
}

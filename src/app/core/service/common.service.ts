import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * The service class for variables and functions that will be used commonly.
 */
export class CommonService {
  /**
   * The variable to check if current page is event detail page.
   */
  public isOnEventDetailPage: boolean = false;

  /**
   * Transformer name of selected asset.
   */
  public transformerName: string;
}

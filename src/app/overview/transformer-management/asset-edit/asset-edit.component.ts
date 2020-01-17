import { Component } from '@angular/core';

import { CommonService } from '../../../core/service/common.service';
/**
 * The enum for tabs
 */
enum TABS {
  GENERAL = 'general',
  FIELD_DEVICE = 'field_device'
}
@Component({
  selector: 'tes-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss']
})

/**
 * The component class for asset edit page.
 */
export class AssetEditComponent {
  /** 
   * The current tab name.
   */
  public currentTab: string = 'general';

  /** 
   * The tabs obj.
   */
  public tabs: {
    GENERAL: string;
    FIELD_DEVICE: string;
  } = TABS;

  /**
   * 
   * @param commonService The common service
   */
  constructor(
    public commonService: CommonService
  ) { }

  /**
   * Switches tab.
   * @param tab: THe tab name.
   */
  public switchTab(tab: string): void {
    this.currentTab = tab;
  }
}

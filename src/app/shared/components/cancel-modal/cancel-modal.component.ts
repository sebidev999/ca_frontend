import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'tes-detail-cancel-modal',
  templateUrl: './cancel-modal.component.html',
  styleUrls: ['./cancel-modal.component.scss']
})

/**
 * The component class for cancel modal.
 */
export class CancelModalComponent implements AfterViewInit {
  /**
   * The action value for Y/N
   */
  @Output() public action: EventEmitter<boolean> = new EventEmitter();

  /**
   * The 'OK' button element ref.
   */
  @ViewChild('acceptButton', { static: false }) public acceptButton: ElementRef;

  /**
   * The variable to check if the accep button is focused.
   */
  public isAcceptBtnFocused: boolean;

  /**
   *
   * @param bsModalRef The modal reference
   */
  constructor(
    public bsModalRef: BsModalRef
  ) { }

  /**
   * Closes modal when user clicks close button
   */
  public closeModal(): void {
    this.bsModalRef.hide();
    if (this.isAcceptBtnFocused) {
      this.action.emit(true);
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.acceptButton.nativeElement.focus();
      this.isAcceptBtnFocused = true;
    });
  }

  /**
   * HostListener for enter keypress.
   * @param event Enter keydown event
   */
  @HostListener('document:keydown.enter', ['$event']) public onKeydownHandler(event: KeyboardEvent): void {
    this.closeModal();
  }

  /**
   * HostListener for arrow keypress.
   * @param event arrow keydown event
   */
  @HostListener('document:keydown', ['$event']) public onArrowKeyDownHandler(event: KeyboardEvent): void {
    if (event.keyCode === 38) {
      this.isAcceptBtnFocused = true;
    } else if (event.keyCode === 40) {
      this.isAcceptBtnFocused = false;
    }
  }
}

import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'highlight'})

/** 
 * The Pipe class to highlight the searched text
 */
export class HighlightPipe implements PipeTransform {
  /**
   * 
   * @param sanitizer The Domsanitizer
   */
  constructor(public sanitizer: DomSanitizer) {}

  /**
   * The function to highlight the matched text.
   * @param text The text.
   * @param search The search keywords
   */
  public transform(text: string, search: string): SafeHtml {
    if (search && text) {
      let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      pattern = pattern.split(' ').filter((t) => {
          return t.length > 0;
      }).join('|');
      const regex = new RegExp(pattern, 'gi'); // global case-insensitive match
      return this.sanitizer.bypassSecurityTrustHtml(
          text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`)
      );
    } else {
      return text;
    }
  }
}

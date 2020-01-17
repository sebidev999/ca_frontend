/**
 * The interface for event.
 */
export interface Event {
  id: string;
  category: string;
  eventName: string;
  device: string;
  asset: string;
  location: string;
  component: string;
  description: string;
  remedy: string;
  report: boolean;
}

/**
 * The interface for event table filters.
 */
export interface EventTableFilter {
  nonReport: boolean;
  red: boolean;
  yellow: boolean;
  grey: boolean;
}

/**
 * The interface for event field list.
 */
export interface EventFieldList {
  propName: string;
  fieldName: string;
}

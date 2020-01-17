/**
 * The interface for event categories.
 */
export interface EventCategories {
  partnerId: number;
  error: {
    view: string;
    emailNotification: boolean;
  };
  warning: {
    view: string;
    emailNotification: boolean;
  };
  info: {
    view: string;
    emailNotification: boolean;
  };
}

/**
 * The enum for categories type.
 */
export enum CategoriesType {
  RED = 'red',
  YELLOW = 'yellow',
  GREY = 'grey'
}

/**
 * The enum for view type.
 */
export enum ViewType {
  ACTIVE = 'active',
  ACTIVE_OR_UNCONFIRMED = 'active Or unconfirmed',
  AT_NO_TIME = 'at no time'
}

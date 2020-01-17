/**
 * The interface for location obj.
 */
export interface Location {
  id: string;
  name: string;
  position: Position;
}

/**
 * The interface for position obj.
 */
export interface Position {
  latitude: number;
  longitude: number;
}

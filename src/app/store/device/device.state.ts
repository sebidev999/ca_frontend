import { Device } from '../../core/models/device/device';

/**
 * Interface for device state
 */
export interface DeviceState {
  devices: Array<Device>;
  pending: boolean;
}

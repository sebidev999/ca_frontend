/**
 * The interface for asset.
 */
export interface Asset {
  id: string;
  transformerName: string;
  location: string;
  manufacturer: string;
  yearOfManufacture: string;
  maximumPower: string;
  serialNumber: string;
  operator?: string;
  number?: string;
  nominalTensionHv?: string;
  nominalTensionLv?: string;
  typeDesignation?: string;
  tapChangerSerialNumber?: string;
  tapChangerManufacture?: string;
}

export enum DeviceStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
  WARNING = 'Warning',
  CONNECTED = 'Connected', // For Meraki
  DISCONNECTED = 'Disconnected', // For Meraki
}

export enum DeviceType {
  FORTIGATE_FIREWALL = 'Fortigate Firewall',
  CISCO_AP = 'Cisco AP',
  MERAKI_SWITCH = 'Meraki Switch',
  MERAKI_AP = 'Meraki AP',
  MERAKI_CAMERA = 'Meraki Camera',
  ROUTER = 'Router', // Generic fallback
}

export interface TrafficDataPoint {
  time: string;
  upload: number;
  download: number;
}

// Base interface for all devices
interface BaseDevice {
  id: string;
  name: string;
  status: DeviceStatus;
  type: DeviceType;
  model: string;
  ipAddress?: string;
  macAddress: string;
  serialNumber: string;
  category : string;
   
}

// Specific Device Types
export interface FortigateFirewall extends BaseDevice {
  type: DeviceType.FORTIGATE_FIREWALL;
  ipAddress: string;
  configStatus: 'In Sync' | 'Out of Sync';
  haStatus: 'Standalone' | 'Active-Passive' | 'Active-Active';
  firmwareVersion: string;
  policyPackageStatus: 'In Sync' | 'Never Installed';
  fortiGuardLicense: 'Valid' | 'Expired';
  cpuUsage: number;
  memoryUsage: number;
  trafficHistory: TrafficDataPoint[];
  Hostname: string;
}

export interface CiscoAP extends BaseDevice {
  type: DeviceType.CISCO_AP;
  ipAddress: string;
  adminStatus: 'Enabled' | 'Disabled';
  operationStatus: 'Up' | 'Down';
  upTime: string;
  policyTag: string;
  siteTag: string;
  rfTag: string;
  cpuUsage: number;
  memoryUsage: number;
  ethernetMacAddress: string;
  trafficHistory: TrafficDataPoint[];
}

export interface MerakiSwitch extends BaseDevice {
  type: DeviceType.MERAKI_SWITCH;
  status: DeviceStatus.CONNECTED | DeviceStatus.DISCONNECTED;
  publicIp: string;
  localIp: string;
  cloudId: string;
  connectivity: string; // UTC timestamp
}

export interface MerakiAP extends BaseDevice {
  type: DeviceType.MERAKI_AP;
  status: DeviceStatus.CONNECTED | DeviceStatus.DISCONNECTED;
  localIp: string;
  connectivity: string; // UTC timestamp
}

export interface MerakiCamera extends BaseDevice {
  type: DeviceType.MERAKI_CAMERA;
}

export interface GenericRouter extends BaseDevice {
    type: DeviceType.ROUTER;
    ipAddress: string;
    cpuUsage: number;
    memoryUsage: number;
    trafficHistory: TrafficDataPoint[];
}


// Union type for any device
export type Device = FortigateFirewall | CiscoAP | MerakiSwitch | MerakiAP | MerakiCamera | GenericRouter;